import DescriptionIcon from "@mui/icons-material/Description";
import { InputAdornment, TextField } from "@mui/material";

interface DescriptionInputProps {
  description: string;
  setDescription: (description: string) => void;
}

const DescriptionInput = ({
  description,
  setDescription,
}: DescriptionInputProps) => {
  return (
    <TextField
      label="Description"
      multiline
      rows={10}
      required={true}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Set a description"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start" className="self-start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default DescriptionInput;
