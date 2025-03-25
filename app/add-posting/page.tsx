"use client";

import JobTypeSelect from "@/app/add-posting//JobTypeSelect";
import CitiesSelect from "@/app/add-posting/CitiesSelect";
import DescriptionInput from "@/app/add-posting/DescriptionInput";
import ExperienceLevelSelect from "@/app/add-posting/ExperienceLevelSelect";
import FieldsInput from "@/app/add-posting/FieldsInput";
import TagsModal from "@/app/add-posting/TagsModal";
import TagsSelect from "@/app/add-posting/TagsSelect";
import TitleInput from "@/app/add-posting/TitleInput";
import City from "@/entities/City";
import Tag from "@/entities/Tag";
import ExperienceLevel from "@/enums/ExperienceLevel";
import JobType from "@/enums/JobType";
import { Button, Chip, Container, Divider, Snackbar } from "@mui/material";
import { FormEvent, useState } from "react";

const AddPosting = () => {
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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [lastJobIdCreated, setLastJobIdCreated] = useState<number | null>(null);

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch("/api/postings", {
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
        cities: cities.map((city) => `/api/cities/${city.id}`),
        tags: tags.map((tag) => `/api/tags/${tag.id}`),
        fields: JSON.stringify(fields),
      }),
    }).then(async (response) => {
      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setLastJobIdCreated(data.id);

      setTitle("");
      setJobType(undefined);
      setExperienceLevel(undefined);
      setCities([]);
      setTags([]);
      setDescription("");
      setFields([]);
      setNewField("");

      handleSnackbarOpen();
    });
  };

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <Divider textAlign="left">
            <Chip label="GENERAL INFO" size="medium" />
          </Divider>

          <div className="my-5 flex flex-col gap-5">
            <TitleInput title={title} setTitle={setTitle} />

            <JobTypeSelect jobType={jobType} setJobType={setJobType} />

            <ExperienceLevelSelect
              experienceLevel={experienceLevel}
              setExperienceLevel={setExperienceLevel}
            />

            <CitiesSelect cities={cities} setCities={setCities} />

            <DescriptionInput
              description={description}
              setDescription={setDescription}
            />

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-6">
                <TagsSelect tags={tags} setTags={setTags} />
              </div>
              <div className="flex-1">
                <TagsModal />
              </div>
            </div>
          </div>

          <Divider textAlign="left">
            <Chip label="APPLICATION INFO" size="medium" />
          </Divider>

          <FieldsInput
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={15000}
        onClose={handleSnackbarClose}
        onClick={() =>
          window.open(
            `https://localhost:8000/api/postings/${lastJobIdCreated}`,
            "_blank",
            "noopener,noreferrer",
          )
        }
        message={`Posting was created.`}
      />
    </>
  );
};

export default AddPosting;
