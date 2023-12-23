"use client";
import { useSetting } from "@/hooks/use-setting";
import { FunctionComponent } from "react";
import CardDetails from "./card-details";
import CardAdd from "@/shared/card-add";

interface CardListProps {}

const CardList: FunctionComponent<CardListProps> = () => {
  const config = useSetting();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-4 gap-y-8">
      <CardAdd
        trigger="onOpenUsefulLinks"
        title="Click to create a new external link"
      />
      {config?.setting?.usefulLinks?.links?.map((link) => (
        <CardDetails {...link} key={link.uuid} />
      ))}
    </div>
  );
};

export default CardList;
