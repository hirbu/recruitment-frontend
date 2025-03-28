"use client";

import { Alert, AlertColor, Snackbar } from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";

interface SnackbarContextType {
  showSnackbar: (message: string, severity: AlertColor, link?: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [link, setLink] = useState<string | undefined>(undefined);

  const showSnackbar = (
    message: string,
    severity: AlertColor,
    link?: string,
  ) => {
    setMessage(message);
    setSeverity(severity);
    setLink(link);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLink(undefined);
  };

  const handleClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
    handleClose();
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          className={`w-100 ${link ? "cursor-pointer" : ""}`}
          onClick={handleClick}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
}
