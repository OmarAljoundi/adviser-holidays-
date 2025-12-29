"use client";
import { FunctionComponent, use } from "react";
import { BreadcrumbItem, Breadcrumbs } from "@/provider/nextui-client";
import { getToursByAttributes } from "@/server/public-query.server";

interface DestinationBreadcrumbProps {
  dataPromise: ReturnType<typeof getToursByAttributes>;
}

const DestinationBreadcrumb: FunctionComponent<DestinationBreadcrumbProps> = ({
  dataPromise,
}) => {
  const result = use(dataPromise);
  return (
    <Breadcrumbs variant="bordered">
      <BreadcrumbItem href="/">الرئيسية</BreadcrumbItem>
      <BreadcrumbItem href="/tour-listing">جميع الرحلات</BreadcrumbItem>
      <BreadcrumbItem href={`/tour-listing/${result?.destinationName}`}>
        {result?.destinationName}
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default DestinationBreadcrumb;
