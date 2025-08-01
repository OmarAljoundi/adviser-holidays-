"use client";
import { filterTours } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import TourCard from "./tour-card";
import { QueryTourSchema } from "@/schema";
import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";
import { CardsLoading } from "./cards-loading";

const RenderTours = ({ tours }: { tours: QueryTourSchema[] }) => {
  const [filter, _] = useQueryStates(
    {
      country: parseAsArrayOf(parseAsString),
      days: parseAsArrayOf(parseAsString),
    },
    {
      clearOnDefault: false,
      scroll: false,
      throttleMs: 0,
      history: "push",
    }
  );

  const { data, isLoading } = useQuery({
    queryKey: ["data", filter.country, filter.days, tours?.length ?? 0],
    queryFn: () => tours,
    refetchInterval: false,
    select: (response) => {
      const result = filterTours(
        {
          country: filter.country,
          days: filter.days,
        },
        response ?? []
      );

      return result;
    },
  });

  if (isLoading) return <CardsLoading />;

  return (
    <div className="mt-4 mb-16">
      <div className="grid grid-cols-12 gap-4 ">
        {data?.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default RenderTours;
