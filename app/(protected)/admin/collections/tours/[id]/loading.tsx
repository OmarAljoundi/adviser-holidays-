"use client";
import ContentWrapper from "@/components/admin-panel/contet-wrapper";
import { FormLoadingWithTabs } from "@/components/form-loading-with-tabs";
import React from "react";

export default function Loading() {
  return (
    <ContentWrapper
      breadcrumbs={[
        { item: "Dashboard", url: "/admin" },
        { item: "All Tours", url: "/admin/collections/tours" },
        { item: "Loading....", currentPage: true },
      ]}
    >
      <FormLoadingWithTabs numberOfTabs={5} />
    </ContentWrapper>
  );
}
