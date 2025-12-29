import type { Metadata } from "next";
import "./globals.css";

import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <React.Fragment>{children}</React.Fragment>;
}
