import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Know Regan",
  description: "A Human from Kathmandu, Nepal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <audio src="/sounds/calmmountain.mp3" autoPlay loop />
        {children}
      </body>
    </html>
  );
}