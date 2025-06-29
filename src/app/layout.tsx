import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PHProvider } from "../components/PostHogProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resumly | ATS friendly resume builder coming soon",
  description: "Resumly helps you create recruiter optimised resumes that sail through applicant tracking systems. Join our waitlist to be first at launch.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PHProvider>{children}</PHProvider>
      </body>
    </html>
  );
}
