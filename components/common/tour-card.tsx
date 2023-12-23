"use client";
import { Tour } from "@/types/custom";
import { FunctionComponent } from "react";
import Carousel from "./carousel";
import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  Clock,
  MapPin,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface TourCardProps {
  tour: Tour;
}

const TourCard: FunctionComponent<TourCardProps> = ({ tour }) => {
  return (
    <div key={tour.id}>
      <Carousel
        uniqueKey={`tour_card__images_${tour.id}`}
        classNames={{
          image: "aspect-[3/2] rounded-b-none",
          container: "rounded-b-none",
        }}
        includeArrows={!!tour.images && tour.images.length > 1}
        images={tour.images ?? []}
      />

      <div
        className="py-3 px-5
       relative bg-white z-40 shadow-card rounded-b-none 
    "
      >
        <h1
          className="text-base md:text-lg lg:text-xl mb-2 text-ellipsis overflow-hidden line-clamp-1 text-primary"
          title={tour.name}
        >
          {tour.name}
        </h1>
        <div className="flex justify-start gap-x-2 items-center h-6">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm text-muted-foreground line-clamp-1 ">
            {tour.tour_countries?.join(" ، ")}
          </h4>
        </div>
        <div className="flex justify-start gap-x-2 items-center h-6">
          <CalendarDays className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm text-muted-foreground">
            {tour.start_day?.join(" ، ") ?? "اليوم غير محدد"}
          </h4>
        </div>
        <div className="flex justify-start gap-x-2 items-center h-6">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm text-muted-foreground">
            {tour.number_of_days} أيام
          </h4>
        </div>
        <div className="flex justify-start gap-x-2 items-center h-6">
          <CircleDollarSign className="w-4 h-4 text-muted-foreground" />
          <h4 className="text-sm text-muted-foreground">
            يبدأ السعر من {tour.price_double} USD
          </h4>
        </div>
        <Separator className="my-4" />
        <Button
          size="sm"
          className="group hover:text-primary duration-500 transition-all w-full"
          as={Link}
          variant="bordered"
          color="primary"
          endContent={
            <ArrowLeft className="w-4 h-4 group-hover:scale-110 duration-200 transition-all" />
          }
          href={`/tour/${tour.slug}`}
        >
          التفاصيل
        </Button>
      </div>
    </div>
  );
};
export default TourCard;
