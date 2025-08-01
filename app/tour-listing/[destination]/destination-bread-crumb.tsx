"use client";
import { FunctionComponent, use } from "react";
import { BreadcrumbItem, Breadcrumbs } from "@/provider/nextui-client";
import { getDestination } from "@/server/public-query.server";

interface DestinationBreadcrumbProps {
  dataPromise: ReturnType<typeof getDestination>;
}

const DestinationBreadcrumb: FunctionComponent<DestinationBreadcrumbProps> = ({
  dataPromise,
}) => {
  const result = use(dataPromise);
  return (
    <Breadcrumbs variant="bordered">
      <BreadcrumbItem href="/">الرئيسية</BreadcrumbItem>
      <BreadcrumbItem href="/tour-listing">جميع الرحلات</BreadcrumbItem>
      <BreadcrumbItem href={`/tour-listing/${result?.result?.destinationName}`}>
        {result?.result?.destinationName}
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default DestinationBreadcrumb;
