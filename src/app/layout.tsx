import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "./_components/navbar";
import { ThemeProvider } from "./_context/providers/theme-provider";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "cs-flashcards",
  description:
    "Make learning easier and more efficient with customizable flashcards.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const themeCookie = cookies().get("cs-flashcards-theme")?.value ?? "system";
  const systemPrefersDark = `(prefers-color-scheme: dark)`;

  return (
    <ThemeProvider>
      <html
        lang="en"
        className={`${GeistSans.variable} ${
          themeCookie === "system"
            ? systemPrefersDark
              ? "dark"
              : "light"
            : themeCookie
        }`}
      >
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
