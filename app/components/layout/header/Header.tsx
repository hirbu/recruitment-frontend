"use client";

import Logo from "@/app/components/layout/header/Logo";
import Nav from "@/app/components/layout/header/Nav";
import { Container } from "@mui/material";

const Header = () => {
  return (
    <header className="mb-5 border-b border-zinc-300">
      <Container className="flex items-center justify-between gap-5 py-5 lg:justify-normal">
        <Logo />
        <Nav />
      </Container>
    </header>
  );
};

export default Header;
