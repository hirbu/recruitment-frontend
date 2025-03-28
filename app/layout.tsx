import Footer from "@/app/components/layout/footer/Footer";
import Header from "@/app/components/layout/header/Header";
import { monoFont, sansFont } from "@/configs/fonts";
import icons from "@/configs/icons";
import theme from "@/configs/theme";
import { SnackbarProvider } from "@/contexts/SnackbarContext";
import { UserProvider } from "@/contexts/UserContext";
import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recruitment++",
  description: "Crafted by Andrei Hirbu",
  icons,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansFont.variable} ${monoFont.variable} bg-zinc-50 font-mono antialiased`}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider>
              <UserProvider>
                <Header />
                {children}
                <Footer />
              </UserProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <GoogleAnalytics gaId="G-XZY8E10MMC" />
      </body>
    </html>
  );
}
