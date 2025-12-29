"use client";
import { FunctionComponent } from "react";
import { BreadcrumbItem, Breadcrumbs } from "@/provider/nextui-client";

interface ListingBreadcrumbProps {}

const ListingBreadcrumb: FunctionComponent<ListingBreadcrumbProps> = () => {
  return (
    <Breadcrumbs variant="bordered">
      <BreadcrumbItem href="/">الرئيسية</BreadcrumbItem>
      <BreadcrumbItem href="/tour-listing">جميع الرحلات</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default ListingBreadcrumb;
