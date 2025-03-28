"use client";

import EmailInput from "@/app/account/EmailInput";
import TestAccount from "@/app/account/login/TestAccount";
import PasswordInput from "@/app/account/PasswordInput";
import { AUTH_CONFIG } from "@/configs/auth";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useUser } from "@/contexts/UserContext";
import LoginIcon from "@mui/icons-material/Login";
import { Button, Chip, Container, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Login = () => {
  const { showSnackbar } = useSnackbar();
  const { login } = useUser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      showSnackbar("Login successful!", "success");

      router.push(AUTH_CONFIG.redirects.afterLogin);
    } catch (error: Error | unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      showSnackbar(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Divider textAlign="left">
        <Chip label="LOGIN" size="medium" />
      </Divider>

      <TestAccount setEmail={setEmail} setPassword={setPassword} />

      <form className="mt-5 flex flex-col gap-5" onSubmit={handleSubmit}>
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        <Button
          type="submit"
          variant="contained"
          startIcon={<LoginIcon />}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Container>
  );
};

export default Login;
