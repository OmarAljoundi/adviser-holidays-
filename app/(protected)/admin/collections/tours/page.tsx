export const revalidate = 0;
import ContentWrapper from "@/components/admin-panel/contet-wrapper";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import React, { Suspense } from "react";
import { TourTable } from "./component/table";
import { tourQuery } from "@/server/tours.server";
import { unstable_cache } from "next/cache";

const tourQueryCached = unstable_cache(
  async () =>
    tourQuery({
      orderBy: { id: "desc" },
      select: {
        name: true,
        numberOfDays: true,
        code: true,
        images: true,
        id: true,
        isActive: true,
        priceDouble: true,
        priceDoubleSa: true,
        priceSingle: true,
        priceSingleSa: true,
        slug: true,
        startDay: true,
        tourCountries: true,

        tourType: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    }) as any,
  ["tourQuery"],
  { revalidate: 86400 }
);

export default async function Page() {
  return (
    <ContentWrapper
      breadcrumbs={[
        { item: "Dashboard", url: "/admin" },
        { item: "Tours", currentPage: true },
      ]}
    >
      <Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            searchableColumnCount={1}
            filterableColumnCount={2}
            cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
            shrinkZero
          />
        }
      >
        <TourTable dataPromise={tourQueryCached()} />
      </Suspense>
    </ContentWrapper>
  );
}
