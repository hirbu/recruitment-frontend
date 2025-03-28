import { useSnackbar } from "@/contexts/SnackbarContext";
import CheckIcon from "@mui/icons-material/Check";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { Button, styled } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

interface ResumeFileInputProps {
  resume: string;
  setResume: (resume: string) => void;
  required?: boolean;
}

const ResumeFileInput = ({
  resume,
  setResume,
  required = false,
}: ResumeFileInputProps) => {
  const { showSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const allowedTypes = ["application/pdf"];

      if (!allowedTypes.includes(file.type)) {
        showSnackbar("Only PDFs are supported.", "error");
        setResume("");
        return;
      }

      setFileName(file.name);

      if (file.size > 5 * 1024 * 1024) {
        showSnackbar("Upload limit is 5MB.", "error");
        setResume("");
        return;
      }

      setLoading(true);

      const resumeData = new FormData();
      resumeData.append("resume", file);

      fetch(`/api/resumes/upload`, {
        method: "POST",
        body: resumeData,
      })
        .then(async (response) => {
          if (!response.ok) {
            setFileName("");
            showSnackbar("Failed to upload resume.", "error");
            return;
          }

          const data = await response.json();
          setResume(data.id);
          showSnackbar("Resume uploaded successfully!", "success");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (resume === "") {
      setFileName("");
    }
  }, [resume]);

  return (
    <Button
      component="label"
      variant="outlined"
      tabIndex={-1}
      color="inherit"
      startIcon={
        loading ? (
          <HourglassBottomIcon />
        ) : fileName ? (
          <CheckIcon />
        ) : (
          <CloudUploadIcon />
        )
      }
    >
      {fileName || `Upload Resume ${required ? "*" : ""}`}
      <VisuallyHiddenInput type="file" onChange={handleFileChange} />
    </Button>
  );
};

export default ResumeFileInput;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
