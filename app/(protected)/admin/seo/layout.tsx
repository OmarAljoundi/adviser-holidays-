import ContentWrapper from "@/components/admin-panel/contet-wrapper";
import React, { ReactNode } from "react";
import { ConfigurationMenu } from "./components/configuration-menu";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <ContentWrapper
      breadcrumbs={[
        { item: "Dashboard", url: "/admin" },
        { item: "Seo", currentPage: true },
      ]}
    >
      <ConfigurationMenu>{children}</ConfigurationMenu>
    </ContentWrapper>
  );
}
