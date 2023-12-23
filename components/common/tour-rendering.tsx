"use client";
import { useState, useEffect, FC, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import React from "react";
import { Tour } from "@/types/custom";
import { filterTours } from "@/lib/utils";
import TourCard from "./tour-card";
import { MdSearchOff } from "react-icons/md";
import { IconContext } from "react-icons";
import { Button, Link } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { REVALIDATE_TOUR_LIST } from "@/lib/keys";
import { getTours } from "@/lib/operations";
const TourRendering: FC<{ tourIds?: number[] }> = ({ tourIds }) => {
  const searchParams = useSearchParams();
  const { ref, inView } = useInView();
  const [currentSize, setCurrentSize] = useState(10);

  const { data: tours } = useQuery({
    queryKey: [REVALIDATE_TOUR_LIST],
    queryFn: async () => await getTours(),
    select: (response) => {
      return tourIds
        ? response?.filter((m) => tourIds.includes(m.id!) && m.is_active)
        : response?.filter((x) => x.is_active);
    },
  });

  useEffect(() => {
    console.log(inView);
    if (inView) {
      setCurrentSize(currentSize + 10);
    }
  }, [inView]);

  const currentTours = useMemo(() => {
    return filterTours(
      {
        country: searchParams?.get("country") as string,
        days: searchParams?.get("days") as string,
        type: searchParams?.get("type") as string,
        sortMemebr: searchParams?.get("sortMemebr"),
        maxprice: searchParams?.get("maxprice") as any,
        minprice: searchParams?.get("minprice") as any,
        sortOrder: searchParams?.get("sortOrder") as any,
      },
      tours || []
    );
  }, [
    searchParams?.get("country"),
    searchParams?.get("days"),
    searchParams?.get("tab"),
    searchParams?.get("type"),
    searchParams?.get("page"),
    searchParams?.get("maxprice"),
    searchParams?.get("minprice"),
    searchParams?.get("sortMemebr"),
    searchParams?.get("sortOrder"),
  ]);

  if (currentTours.length == 0) {
    return (
      <div className="grid justify-items-center gap-y-10">
        <div
          className="p-2 rounded-medium  text-primary"
          style={{ background: "#4e008a26" }}
        >
          <IconContext.Provider
            value={{ size: "100px", className: "text-primary" }}
          >
            <div>
              <MdSearchOff />
            </div>
          </IconContext.Provider>
        </div>
        <div className="flex flex-col justify-center items-center justify-items-center gap-y-4">
          <h1 className="text-xl">لاتوجد نتائج لبحثك</h1>
          <Link href="/tour-listing">العودة للجميع الرحلات</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-1 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3 2xl:gap-y-10 2xl:grid-cols-4">
      {currentTours?.slice(0, currentSize).map((tour) => (
        <TourContent ref={ref} key={tour.id} {...tour} />
      ))}
    </div>
  );
};

export default TourRendering;

// eslint-disable-next-line react/display-name
const TourContent = React.forwardRef((tour: Tour, ref) => {
  const content = ref ? (
    <article
      className="rounded-lg tour-card listing-card group/item relative inline-flex w-full flex-col"
      //@ts-ignore
      ref={ref}
    >
      <TourCard tour={tour} />
    </article>
  ) : (
    <article className="rounded-lg tour-card listing-card group/item relative inline-flex w-full flex-col">
      <TourCard tour={tour} />
    </article>
  );
  return content;
});
