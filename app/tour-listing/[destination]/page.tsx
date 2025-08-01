import Filter from "@/components/filter/filter";
import { getDestination, getDestinations } from "@/server/public-query.server";
import React, { Suspense } from "react";
import DestinationBreadcrumb from "./destination-bread-crumb";
import { FilterLoading } from "@/components/shared/filter-loading";
import { CardsLoading } from "@/components/shared/cards-loading";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/components/shared/tour-lising-search-params";
import { RenderToursFromDest } from "@/components/shared/render-tours-server";

const DestinationPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ destination: string }>;
  searchParams: Promise<SearchParams>;
}) => {
  const { destination } = await params;
  const { country, days, maxprice } = await loadSearchParams(searchParams);

  return (
    <React.Fragment>
      <DestinationBreadcrumb
        dataPromise={getDestination(decodeURIComponent(destination), "SAR")}
      />
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
        <RenderToursFromDest
          country={country}
          days={days}
          maxprice={maxprice}
          dataPromise={getDestination(decodeURIComponent(destination), "SAR")}
        />
      </Suspense>
    </React.Fragment>
  );
};

export default DestinationPage;
