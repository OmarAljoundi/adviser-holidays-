import ContentWrapper from "@/components/admin-panel/contet-wrapper";
import  { Suspense } from "react";
import { TourTypesTable } from "./component/table";
import { tourTypeQuery } from "@/server/tour-types.server";
import LoadingSkeleton from "./component/loading-skeleton";
import { unstable_cache } from "next/cache";
import { REVALIDATE_TOUR_TYPE } from "@/lib/keys";

const tourTypeQueryCached = unstable_cache(
  async () => tourTypeQuery({ orderBy: { order: "asc" } }),
  [REVALIDATE_TOUR_TYPE],
  { revalidate: 86400,tags:[REVALIDATE_TOUR_TYPE] }
);

export default async function Page() {
  return (
    <ContentWrapper
      breadcrumbs={[
        { item: "Dashboard", url: "/admin" },
        { item: "Tour types", currentPage: true },
      ]}
    >
      <Suspense fallback={<LoadingSkeleton />}>
        <TourTypesTable dataPromise={tourTypeQueryCached()} />
      </Suspense>
    </ContentWrapper>
  );
}
