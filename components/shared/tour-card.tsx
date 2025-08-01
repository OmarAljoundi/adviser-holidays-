"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import BlurImage from "./blur-image";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { QueryTourSchema } from "@/schema";
import TourPrice from "./tour-price";

const TourCard: React.FC<{
  tour: QueryTourSchema;
}> = ({ tour }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-2 col-span-12 md:col-span-6 xl:col-span-4  ">
      <div className="rounded-2xl relative group">
        <div className="relative">
          <Link href={`/tour/${tour.slug}`}>
            <BlurImage
              priority={false}
              loading="lazy"
              width={1000}
              height={400}
              quality={70}
              src={tour.images && tour.images.length > 0 ? tour.images[0] : ""}
              alt="image"
              className="rounded-2xl w-full h-[200px] lg:h-[260px]"
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </Link>

          <BadgeDetail className="top-2 right-2">
            {tour.numberOfDays} يوم
          </BadgeDetail>
          <BadgeDetail className="top-2 left-2">
            {tour.tourType?.name}
          </BadgeDetail>
        </div>
      </div>
      <div className="p-2 sm:p-4 lg:p-5">
        <div className="flex items-center gap-1 mb-4 mt-5 sm:mt-3">
          <div className="flex gap-1">
            {tour?.tourCountries?.slice(0, 4).map((i) => (
              <span
                className="inline-block bg-secondary text-black/70 px-2 py-1 text-[14px] rounded-md font-primary"
                key={i}
              >
                {i}
              </span>
            ))}
          </div>
        </div>
        <Link
          href={`/tour/${tour.slug}`}
          className="text-base sm:text-xl font-medium text-neutral-700 mb-4 font-primary"
        >
          {tour.name}
        </Link>
      </div>
      <div className="property-card__body py-0 mx-5">
        <div className=" border-t border-dashed"></div>
      </div>
      <div className="px-2 sm:px-5 pb-5 pt-3">
        <div className="flex flex-wrap justify-between items-center gap-5">
          <TourPrice tour={tour} />

          <Link href={`/tour/${tour.slug}`}>
            <Button variant={"default"} size={"sm"} className="font-primary">
              عرض التفاصيل
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;

function BadgeDetail({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <div
      className={cn(
        className,
        `absolute  bg-white w-auto px-4 h-11 sm:h-6 lg:h-11 rounded-full shadow-xl border-primary border-2`
      )}
    >
      <div className="flex justify-center items-center h-full text-base sm:text-sm  lg:text-base font-primary">
        {children}
      </div>
    </div>
  );
}
