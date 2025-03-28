"use client";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { useUser } from "@/contexts/UserContext";
import { CircularProgress, Container } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AUTH_CONFIG } from "@/configs/auth";

export default function Logout() {
  const { logout } = useUser();
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        router.push(AUTH_CONFIG.redirects.afterLogout);
      } catch (error: Error | unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Logout failed.";
        showSnackbar(errorMessage, "error");
      }
    };

    handleLogout();
  }, [logout, router, showSnackbar]);

  return (
    <Container className="flex h-[50vh] flex-col items-center justify-center">
      <div className="mb-3">
        <CircularProgress />
      </div>
      <p>Buh-bye! ☀️</p>
    </Container>
  );
}
