/** @format */

import "./globals.css";

import { Metadata, Viewport } from "next";

import Providers from "@/lib/providers/Providers";

export const metadata: Metadata = {
  title: "InPro Store",
  description: "Product of Inpro Academy",
  manifest: "/manifest.json",

  icons: {
    icon: "/icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {" "}
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
