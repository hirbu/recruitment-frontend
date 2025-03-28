"use client";

import { useSnackbar } from "@/contexts/SnackbarContext";
import Posting from "@/interfaces/Posting";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import PersonIcon from "@mui/icons-material/Person";
import {
  Button,
  Chip,
  Divider,
  InputAdornment,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";
import ResumeFileInput from "./ResumeFileInput";

interface NewApplicationProps {
  posting: Posting;
}

const NewApplication = ({ posting }: NewApplicationProps) => {
  const { showSnackbar } = useSnackbar();
  const fields =
    typeof posting.fields === "string"
      ? JSON.parse(posting.fields)
      : posting.fields;
  const [name, setName] = useState("");
  const [resume, setResume] = useState("");
  const initialFieldValues = fields.reduce(
    (acc: { [key: string]: string }, field: string) => {
      acc[field] = "";
      return acc;
    },
    {},
  );

  const [fieldsValues, setFieldsValues] = useState<{ [key: string]: string }>(
    initialFieldValues,
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        posting: `/api/postings/${posting.id}`,
        resume: `/api/resumes/${resume}`,
        fields: JSON.stringify(fieldsValues),
      }),
    }).then((response) => {
      if (!response.ok) {
        showSnackbar("Failed to apply", "error");
        return;
      }

      setName("");
      setResume("");
      setFieldsValues(initialFieldValues);
      showSnackbar("Applied successfully", "success");
    });
  };

  return (
    <div className="my-5">
      <Divider textAlign="left">
        <Chip label="APPLY" size="medium" />
      </Divider>

      <form className="mt-5 flex flex-col gap-5" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          placeholder="Set a title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        {fields.map((field: string) => (
          <TextField
            key={field}
            label={field}
            variant="outlined"
            placeholder="Fill out the field"
            required={true}
            value={fieldsValues[field]}
            onChange={(e) =>
              setFieldsValues((prev) => ({
                ...prev,
                [field]: e.target.value,
              }))
            }
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <FormatColorTextIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        ))}

        <ResumeFileInput
          resume={resume}
          setResume={setResume}
          required={true}
        />

        <div className="mt-5">
          <Button type="submit" variant="contained" size="large">
            Apply
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewApplication;
