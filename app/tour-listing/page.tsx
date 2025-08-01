import Filter from "@/components/filter/filter";
import { CardsLoading } from "@/components/shared/cards-loading";
import { FilterLoading } from "@/components/shared/filter-loading";
import { getDestinations, getTours } from "@/server/public-query.server";
import React, { Suspense } from "react";
import ListingBreadcrumb from "./listing-breadcrumb";
import { RenderToursFromListing } from "@/components/shared/render-tours-server";

export default async function TourListing() {
  // const { country, days, maxprice } = await loadSearchParams(searchParams);

  return (
    <React.Fragment>
      <ListingBreadcrumb />
      <Suspense
        fallback={
          <React.Fragment>
            <div className="mt-8">
              <FilterLoading />
            </div>
          </React.Fragment>
        }
      >
        <div className="mt-8">
          <Filter
            onChange={true}
            enableTabs={true}
            destinationPromise={getDestinations()}
          />
        </div>
      </Suspense>
      <Suspense fallback={<CardsLoading />}>
        <RenderToursFromListing dataPromise={getTours("SAR")} />
      </Suspense>
    </React.Fragment>
  );
}
