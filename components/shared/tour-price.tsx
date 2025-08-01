import { QueryTourSchema } from "@/schema";
import React from "react";

export default function TourPrice({ tour }: { tour: QueryTourSchema }) {
  return (
    <div className=" text-primary">
      <span className="font-bold font-english text-3xl">
        {" "}
        {tour?.priceDoubleSa}
      </span>{" "}
      <span className="font-primary text-primary text-sm">د.أ</span>
    </div>
  );
}
