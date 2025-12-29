import React, { useState } from "react";
import { AnimatableTab } from "@/components/ui/animatable-tab";
import { GeneralInfo } from "./general-info";
import { TourDates } from "./tour-dates";
import { Hotels } from "./hotels";
import { TourFeatures } from "./tour-features";
import { SeoForm } from "@/components/seo-form";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useFormContext } from "react-hook-form";

const tabs = [
  { id: "general", label: "General" },
  { id: "tourdates", label: "Tour Dates" },
  { id: "hotels", label: "Hotels" },
  { id: "sections", label: "Sections" },
  { id: "includes", label: "Includes" },
  { id: "excludes", label: "Excludes" },
  { id: "search engine", label: "Search Engine" },
];

export function TourForm() {
  const [tabId, setTabId] = useState(tabs[0].id);

  const { formState } = useFormContext();
  return (
    <div className="flex flex-col w-full ">
      <AnimatableTab tabs={tabs} onTabChange={setTabId} className="mb-4">
        <div className="absolute right-0 top-0">
          <Button
            size={"sm"}
            leadingIcon={<Save />}
            isLoading={formState.isSubmitting}
          >
            Save
          </Button>
        </div>
      </AnimatableTab>
      {tabId == "general" && <GeneralInfo />}
      {tabId == "tourdates" && <TourDates />}
      {tabId == "hotels" && <Hotels />}
      {tabId == "sections" && <TourFeatures fieldKey="tourSections" />}
      {tabId == "includes" && <TourFeatures fieldKey="tourIncludes" />}
      {tabId == "excludes" && <TourFeatures fieldKey="tourExcludes" />}
      {tabId == "search engine" && <SeoForm />}
    </div>
  );
}
