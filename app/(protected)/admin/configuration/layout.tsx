import ContentWrapper from "@/components/admin-panel/contet-wrapper";
import React, { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <ContentWrapper
      breadcrumbs={[
        { item: "Dashboard", url: "/admin" },
        { item: "Configuration", currentPage: true },
      ]}
    >
      {children}
    </ContentWrapper>
  );
}
