"use client";

import ApplicationFieldsInput from "@/app/add-posting/ApplicationFieldsInput";
import RequiredFields from "@/app/add-posting/RequiredFields";
import { useSnackbar } from "@/contexts/SnackbarContext";
import ExperienceLevel from "@/enums/ExperienceLevel";
import JobType from "@/enums/JobType";
import City from "@/interfaces/City";
import Tag from "@/interfaces/Tag";
import { Button, Chip, Container, Divider } from "@mui/material";
import { FormEvent, useState } from "react";
import { useUser } from "../../contexts/UserContext";

const AddPosting = () => {
  const { user } = useUser();
  const { showSnackbar } = useSnackbar();

  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState<JobType | undefined>(undefined);
  const [experienceLevel, setExperienceLevel] = useState<
    ExperienceLevel | undefined
  >(undefined);
  const [cities, setCities] = useState<City[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [description, setDescription] = useState("");

  const [fields, setFields] = useState<string[]>([]);
  const [newField, setNewField] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const fetchData = async () => {
      const response = await fetch("/api/postings", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          jobType,
          experienceLevel,
          description,
          owner: `/api/users/${user?.id}`,
          cities: cities.map((city) => `/api/cities/${city.id}`),
          tags: tags.map((tag) => `/api/tags/${tag.id}`),
          fields: JSON.stringify(fields),
        }),
      });

      if (!response.ok) {
        showSnackbar("Failed to create posting.", "error");
        return;
      }

      const data = await response.json();

      setTitle("");
      setJobType(undefined);
      setExperienceLevel(undefined);
      setCities([]);
      setTags([]);
      setDescription("");
      setFields([]);
      setNewField("");

      showSnackbar(
        `Posting was created successfully! Click here to view it.`,
        "success",
        `/posting/${data.id}`,
      );
    };

    fetchData();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Divider textAlign="left">
          <Chip label="GENERAL INFO" size="medium" />
        </Divider>

        <RequiredFields
          title={title}
          setTitle={setTitle}
          jobType={jobType as JobType}
          setJobType={setJobType}
          experienceLevel={experienceLevel as ExperienceLevel}
          setExperienceLevel={setExperienceLevel}
          cities={cities}
          setCities={setCities}
          description={description}
          setDescription={setDescription}
          tags={tags}
          setTags={setTags}
        />

        <Divider textAlign="left">
          <Chip label="APPLICATION INFO" size="medium" />
        </Divider>

        <ApplicationFieldsInput
          fields={fields}
          setFields={setFields}
          newField={newField}
          setNewField={setNewField}
        />

        <Divider textAlign="left">
          <Chip label="SUBMIT" size="medium" />
        </Divider>

        <div className="mt-5">
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AddPosting;
