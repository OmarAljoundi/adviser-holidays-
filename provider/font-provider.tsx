"use client";
import React, { ReactNode, useEffect, useState } from "react";

export function FontProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return <main>{children}</main>;
}
