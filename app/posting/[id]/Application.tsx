import ApplicationInterface from "@/interfaces/Application";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import StarIcon from "@mui/icons-material/Star";
import { Button, Chip } from "@mui/material";
import moment from "moment";

interface ApplicationProps {
  application: ApplicationInterface;
}

const Application = ({ application }: ApplicationProps) => {
  return (
    <div className="flex flex-col gap-2 rounded border border-[var(--mui-palette-grey-400)] px-2 py-3 hover:border-black">
      <div className="flex items-center gap-2">
        <Chip
          label={moment(application.createdAt).fromNow()}
          size="small"
          icon={<AccessTimeIcon fontSize="small" />}
        />

        <Chip
          label={`Score: ${application.score}`}
          size="small"
          icon={<StarIcon fontSize="small" />}
        />
      </div>

      <h3 className="my-2 text-xl font-bold">{application.name}</h3>

      <ul className="mb-3">
        {Object.entries(
          JSON.parse(application.fields) as Record<string, string>,
        ).map(([key, value]) => (
          <li key={key} className="mb-2 flex flex-col">
            <strong>{key}</strong>
            <span>{value}</span>
          </li>
        ))}
      </ul>

      <Button
        size="small"
        color="inherit"
        variant="outlined"
        onClick={() => {
          window.open(
            `/api/resumes/${application.resume.id}/download`,
            "_blank",
          );
        }}
      >
        <div className="flex items-center gap-1 px-2 py-1">
          <span>Download Resume</span>
          <FileDownloadIcon fontSize="small" />
        </div>
      </Button>
    </div>
  );
};

export default Application;
