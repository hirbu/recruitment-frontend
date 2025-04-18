import { Space_Grotesk, Space_Mono } from "next/font/google";

const sansFont = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const monoFont = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export { monoFont, sansFont };
