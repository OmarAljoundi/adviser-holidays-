"use client";
import { Separator } from "@/components/ui/separator";
import { Setting } from "@/types/custom";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { FunctionComponent } from "react";
import VisaCard from "./visa-card";

interface VisaCardListingProps {
  data?: Setting;
}

const VisaCardListing: FunctionComponent<VisaCardListingProps> = ({ data }) => {
  return (
    <>
      <Breadcrumbs variant="bordered">
        <BreadcrumbItem href="/">الرئيسية</BreadcrumbItem>
        <BreadcrumbItem href="/visa">التأشيرات</BreadcrumbItem>
      </Breadcrumbs>
      <Separator className="my-4" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data?.visa?.visa_types?.map((visa) => (
          <VisaCard visa={visa} key={visa.uuid} />
        ))}
      </div>
    </>
  );
};

export default VisaCardListing;
