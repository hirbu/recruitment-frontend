import { useSnackbar } from "@/contexts/SnackbarContext";
import { Alert, AlertTitle } from "@mui/material";

interface TestAccountProps {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

const TestAccount = ({ setEmail, setPassword }: TestAccountProps) => {
  const { showSnackbar } = useSnackbar();

  const handleClick = () => {
    setEmail("test@example.com");
    setPassword("zY5A01BOE96T0v3u1LsCud8MiQYzOkkh");
    showSnackbar("Test account filled in. Just press login.", "success");
  };

  return (
    <Alert severity="info" className="my-7">
      <AlertTitle>Welcome 👋</AlertTitle>
      <button
        className="mb-3 cursor-pointer hover:underline"
        onClick={handleClick}
      >
        You can use a test account to login. Click me to fill it out. 🖱️
      </button>
    </Alert>
  );
};

export default TestAccount;
