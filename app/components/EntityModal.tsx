import { useSnackbar } from "@/contexts/SnackbarContext";
import Entity from "@/interfaces/Entity";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Divider, Modal, TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

export interface EntityModalProps {
  name: string;
  endpoint: string;
}

export function EntityModal<T extends Entity>({
  name,
  endpoint,
}: EntityModalProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [entities, setEntities] = useState<T[]>([]);
  const { showSnackbar } = useSnackbar();

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  useEffect(() => {
    if (!modalOpen) {
      return;
    }

    setLoading(true);

    fetch(endpoint, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((response) => setEntities(response))
      .finally(() => setLoading(false));
  }, [modalOpen, endpoint]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItem(e.target.value);
  };

  const handleCreate = async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const response = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ name: newItem }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        showSnackbar(`Failed to create ${name.toLowerCase()}.`, "error");
        return;
      }

      const data = await response.json();
      setEntities([...entities, data]);
      setNewItem("");
      showSnackbar(`${name} created successfully!`, "success");
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      showSnackbar(`Failed to delete ${name.toLowerCase()}.`, "error");
      return;
    }

    setEntities(entities.filter((tag) => tag.id !== id));
    showSnackbar(`${name} deleted successfully!`, "success");
  };

  return (
    <>
      <Button
        variant="outlined"
        className="h-full w-full"
        color="inherit"
        onClick={handleModalOpen}
      >
        Edit {name}
      </Button>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <div className="absolute top-1/2 left-1/2 z-10 h-5/6 max-h-150 w-4/6 max-w-100 -translate-x-1/2 -translate-y-1/2 overflow-scroll rounded border border-black bg-white p-4 shadow-2xl">
          <h2 className="font-bold">Edit {name}</h2>
          <Divider className="pt-5" />
          <div className="mt-5">
            <TextField
              required
              className="w-full"
              label="Enter a new item"
              size="small"
              value={newItem}
              onChange={handleChange}
              onKeyDown={handleCreate}
            />
          </div>
          <Divider className="pt-5" />
          <div className="mt-5">
            {loading
              ? "Loading..."
              : entities.map((tag) => (
                  <div key={tag.id} className="flex justify-between">
                    <span>{tag.name}</span>
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleDelete(tag.id)}
                    >
                      <DeleteIcon className="text-red-500" />
                      <span className="text-red-500">Delete</span>
                    </Button>
                  </div>
                ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
