"use client";
import BlurImage from "@/components/common/blur-image";
import { Separator } from "@/components/ui/separator";
import { REVALIDATE_LOCATION_LIST } from "@/lib/keys";
import { getDestination } from "@/lib/operations";
import { Location } from "@/types/custom";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { BsAirplane } from "react-icons/bs";

const DestinationListing = () => {
  function getTotalTours(location: Location) {
    var total = 0;

    location.location_attributes?.map((x) => {
      total += x.location_tours?.length ?? 0;
    });
    return total;
  }

  const { data: destinations } = useQuery({
    queryKey: [REVALIDATE_LOCATION_LIST],
    queryFn: async () => await getDestination(),
  });
  return (
    <div className="container mt-24 mb-10 ">
      <h1 className="text-3xl text-center">الأقسام</h1>
      <Separator className="my-4" />
      <div className="grid grid-cols-12 gap-4">
        {destinations?.results
          ?.sort((a, b) => (a.image?.order || 0) - (b.image?.order || 0))
          .map((location) => (
            <Link
              href={`/tour-listing/${location.slug}`}
              key={location.id}
              className={"col-span-12 md:col-span-6 lg:col-span-4 group"}
            >
              <div className="relative rounded-2xl group">
                <div className="listing-card__img aspect-[4/3]">
                  {location.image?.url && (
                    <BlurImage
                      src={`${location.image?.url}`}
                      fill
                      alt="image"
                      className=" w-full rounded-2xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div
                  className="absolute top-0 left-0 flex flex-col justify-between h-full
               w-full before:w-full before:absolute before:h-full before:bottom-0 
               before:left-0 before:bg-gradient-to-t before:rounded-medium
              before:from-slate-800 before:to-transparent group-hover:after:w-full
               group-hover:after:absolute group-hover:after:h-full group-hover:after:bottom-0 
               group-hover:after:left-0 group-hover:after:bg-gradient-to-t group-hover:after:rounded-medium 
               group-hover:after:from-primary group-hover:after:to-transparent group-hover:after:opacity-60 "
                >
                  <div>
                    <Link
                      href="hotel-listing-grid"
                      className="inline-block py-2 px-5  absolute top-6 left-6  text-primary  rounded-medium w-15 
                      font-bold h-auto bg-primary text-white shadow-xl p-2.5"
                    >
                      {getTotalTours(location)}{" "}
                      {getTotalTours(location) > 10 ? "رحلة" : "رحلات"}
                    </Link>
                  </div>
                  <div className="self-end px-5 pb-5 flex flex-wrap w-full gap-4 items-center justify-between z-10">
                    <div>
                      <div className="flex gap-2 items-center ">
                        <BsAirplane className=" text-3xl text-[#9C742B] group-hover:rotate-45 group-hover:duration-1000 duration-1000 transition-all" />
                        <h4 className="md:text-lg lg:text-sm xl:text-lg truncate text-white font-semibold text-base sm:text-2xl">
                          {location.name}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default DestinationListing;
