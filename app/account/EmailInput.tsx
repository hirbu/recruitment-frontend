import EmailIcon from "@mui/icons-material/Email";
import { InputAdornment, TextField } from "@mui/material";

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
}

const EmailInput = ({ email, setEmail }: EmailInputProps) => (
  <TextField
    label="Email"
    placeholder="Enter your email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <EmailIcon />
          </InputAdornment>
        ),
      },
    }}
  />
);

export default EmailInput;
