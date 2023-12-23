"use client";
import { FunctionComponent } from "react";
import { BreadcrumbItem, Breadcrumbs } from "@/provider/nextui-client";

interface LinksBreadCrumbProps {}

const LinksBreadCrumb: FunctionComponent<LinksBreadCrumbProps> = () => {
  return (
    <Breadcrumbs variant="bordered">
      <BreadcrumbItem href="/">الرئيسية</BreadcrumbItem>
      <BreadcrumbItem href="/about-us">الروابط المهمة</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default LinksBreadCrumb;
