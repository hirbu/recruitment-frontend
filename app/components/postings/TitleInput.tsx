import TextFieldsIcon from "@mui/icons-material/TextFields";
import { InputAdornment, TextField } from "@mui/material";

interface TitleInputProps {
  title: string;
  setTitle: (title: string) => void;
  required?: boolean;
}

const TitleInput = ({ title, setTitle, required = false }: TitleInputProps) => {
  return (
    <TextField
      label="Title"
      variant="outlined"
      placeholder="Set a title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required={required}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <TextFieldsIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default TitleInput;
