import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Button,
  Divider,
  InputAdornment,
  Modal,
  TextField,
} from "@mui/material";
import { KeyboardEvent, useState } from "react";

interface ApplicationFieldsInputProps {
  fields: string[];
  setFields: (fields: string[]) => void;
  newField: string;
  setNewField: (newField: string) => void;
}

const ApplicationFieldsInput = ({
  fields,
  setFields,
  newField,
  setNewField,
}: ApplicationFieldsInputProps) => {
  const [editField, setEditField] = useState({ old: "", new: "" });
  const [openEditFieldModal, setOpenEditFieldModal] = useState(false);

  const handleCreateNewField = (e: KeyboardEvent) => {
    if (e.key !== "Enter" || newField === "") {
      return;
    }
    e.preventDefault();

    setFields([...fields, newField]);
    setNewField("");
  };

  const handleFieldDelete = (field: string) => {
    setFields(fields.filter((f) => f !== field));
  };

  const handleFieldEditStart = (field: string) => {
    handleEditFieldModalOpen();

    setEditField({ old: field, new: field });
  };

  const handleFieldEditEnd = (e: KeyboardEvent) => {
    if (e.key !== "Enter" || editField.new === "") {
      return;
    }
    e.preventDefault();

    const index = fields.indexOf(editField.old);

    const newFields = [...fields];
    newFields[index] = editField.new;
    setFields(newFields);

    handleEditFieldModalClose();
  };

  const handleEditFieldModalOpen = () => {
    setOpenEditFieldModal(true);
  };

  const handleEditFieldModalClose = () => {
    setOpenEditFieldModal(false);
  };

  const handleFieldMoveUp = (field: string) => {
    const index = fields.indexOf(field);

    if (index === 0) {
      return;
    }

    const newFields = [...fields];
    [newFields[index - 1], newFields[index]] = [
      newFields[index],
      newFields[index - 1],
    ];
    setFields(newFields);
  };

  const handleFieldMoveDown = (field: string) => {
    const index = fields.indexOf(field);

    if (index === fields.length - 1) {
      return;
    }

    const newFields = [...fields];
    [newFields[index], newFields[index + 1]] = [
      newFields[index + 1],
      newFields[index],
    ];
    setFields(newFields);
  };

  return (
    <div className="my-5 flex flex-col gap-3">
      <div className="rounded-md border border-[rgba(0,0,0,0.25)] p-4">
        <FormatColorTextIcon /> Name*
      </div>
      <div className="rounded-md border border-[rgba(0,0,0,0.25)] p-4">
        <FileCopyIcon /> Resume*
      </div>
      {fields.map((field, index) => (
        <div
          key={field}
          className="flex flex-col gap-2 rounded-md border border-[rgba(0,0,0,0.25)] p-3 sm:flex-row"
        >
          <div className="flex flex-1 gap-3">
            <FormatColorTextIcon />
            <div className="flex-1">{field}</div>
          </div>
          <div className="my-2 sm:hidden">
            <Divider />
          </div>
          <div className="flex flex-row justify-center">
            <Button
              onClick={() => handleFieldMoveUp(field)}
              size="small"
              color="inherit"
              disabled={index === 0}
            >
              <KeyboardArrowUpIcon fontSize="small" />
            </Button>
            <Button
              onClick={() => {
                handleFieldEditStart(field);
              }}
              size="small"
              color="inherit"
            >
              <CreateIcon fontSize="small" />
            </Button>
            <Button
              onClick={() => {
                handleFieldDelete(field);
              }}
              size="small"
              color="inherit"
            >
              <DeleteIcon fontSize="small" />
            </Button>
            <Button
              onClick={() => handleFieldMoveDown(field)}
              size="small"
              color="inherit"
              disabled={index === fields.length - 1}
            >
              <KeyboardArrowDownIcon fontSize="small" />
            </Button>
          </div>
        </div>
      ))}
      <TextField
        label="New Field"
        variant="outlined"
        placeholder="Create a new field"
        value={newField}
        onChange={(e) => {
          setNewField(e.target.value);
        }}
        onKeyDown={handleCreateNewField}
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
      <Modal open={openEditFieldModal} onClose={handleEditFieldModalClose}>
        <div className="absolute top-1/2 left-1/2 z-10 w-4/6 max-w-100 -translate-x-1/2 -translate-y-1/2 overflow-scroll rounded border border-black bg-white p-4 shadow-2xl">
          <h2>Edit field</h2>
          <Divider className="pt-5" />
          <div className="mt-5">
            <TextField
              required
              className="w-full"
              label="Enter a new item"
              size="small"
              value={editField.new}
              onChange={(e) =>
                setEditField({ old: editField.old, new: e.target.value })
              }
              onKeyDown={handleFieldEditEnd}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ApplicationFieldsInput;
