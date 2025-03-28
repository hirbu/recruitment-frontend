import LockIcon from "@mui/icons-material/Lock";
import { InputAdornment, TextField } from "@mui/material";

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
}

const PasswordInput = ({ password, setPassword }: PasswordInputProps) => (
  <TextField
    label="Password"
    placeholder="Enter your password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon />
          </InputAdornment>
        ),
      },
    }}
  />
);

export default PasswordInput;
