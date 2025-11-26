import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MommyGoose - AI Marketing on Autopilot",
  description: "Deploy autonomous AI agents that market your product 24/7. No more scheduling posts. No more staring at analytics. Just results.",
  openGraph: {
    title: "MommyGoose - AI Marketing on Autopilot",
    description: "Deploy autonomous AI agents that market your product 24/7",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MommyGoose - AI Marketing on Autopilot",
    description: "Deploy autonomous AI agents that market your product 24/7",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
