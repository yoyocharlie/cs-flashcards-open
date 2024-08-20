import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "./_components/navbar";
import { ThemeProvider } from "./_context/providers/theme-provider";

export const metadata: Metadata = {
  title: "cs-flashcards",
  description:
    "Make learning easier and more efficient with customizable flashcards.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <TRPCReactProvider>
            <Navbar />
            {children}
          </TRPCReactProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}
