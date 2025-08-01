"use client";
import { generate } from "@/lib/word-helper";
import { QueryTourSchema } from "@/schema";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { File } from "lucide-react";
import { FunctionComponent } from "react";

interface TourBreadcrumbProps {
  tour: QueryTourSchema;
}

const TourBreadcrumb: FunctionComponent<TourBreadcrumbProps> = ({ tour }) => {
  return (
    <div className="my-6 flex justify-between flex-wrap items-center gap-x-2 gap-y-4 ">
      <Breadcrumbs variant="bordered">
        <BreadcrumbItem href="/">الرئيسية</BreadcrumbItem>
        <BreadcrumbItem href="/tour-listing">جميع الرحلات</BreadcrumbItem>
        <BreadcrumbItem href="/">{tour.name}</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex gap-x-2">
        <Button
          size="sm"
          color="primary"
          type="submit"
          endContent={<File />}
          onPress={async () => await generate(tour)}
        >
          تحميل البرنامج
        </Button>
      </div>
    </div>
  );
};

export default TourBreadcrumb;
