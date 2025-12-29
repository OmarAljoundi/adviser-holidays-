export const revalidate = 0;
import ContentWrapper from "@/components/admin-panel/contet-wrapper";
import  { Suspense } from "react";
import { locationQuery } from "@/server/location.server";
import { LocationTable } from "./components/table";
import LoadingSkeleton from "./components/loading-skeleton";
import { unstable_cache } from "next/cache";
import { REVALIDATE_LOCATION_LIST } from "@/lib/keys";

const locationQueryCached = unstable_cache(
  async () =>
    locationQuery({
      orderBy: { order: "asc" },
      include: {
        attributes: true,
      },
    }),

  [REVALIDATE_LOCATION_LIST],
  { revalidate: 86400,tags:[REVALIDATE_LOCATION_LIST] }
);

export default async function Page() {
  return (
    <ContentWrapper
      breadcrumbs={[
        { item: "Dashboard", url: "/admin" },
        { item: "Destinations", currentPage: true },
      ]}
    >
      <Suspense fallback={<LoadingSkeleton />}>
        <LocationTable dataPromise={locationQueryCached()} />
      </Suspense>
    </ContentWrapper>
  );
}
