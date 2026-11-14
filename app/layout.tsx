
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HackMaterials | Technomaker",
  description:
    "Choose your hackathon challenge, select your materials, and submit your team's reservation to Technomaker Club.",
  applicationName: "HackMaterials",
  keywords: [
    "Technomaker",
    "Hackathon",
    "Materials",
    "Reservation",
    "Robotics",
  ],
};

export const viewport: Viewport = {
  themeColor: "#080b14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
