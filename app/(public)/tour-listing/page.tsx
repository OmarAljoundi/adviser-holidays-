"use cache";

import Filter from "@/components/filter/filter";
import { CardsLoading } from "@/components/shared/cards-loading";
import { FilterLoading } from "@/components/shared/filter-loading";
import { getDestinations, getTours } from "@/server/public-query.server";
import React, { Suspense } from "react";
import ListingBreadcrumb from "./listing-breadcrumb";
import { RenderToursFromDest } from "@/components/shared/render-tours-server";

export default async function TourListing() {
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
        <RenderToursFromDestServer />
      </Suspense>
    </React.Fragment>
  );
}

async function RenderToursFromDestServer() {
  const tours = await getTours();

  return <RenderToursFromDest result={{ destinationName: "", tours }} />;
}
