import TourRendering from "@/components/common/tour-rendering";
import {
  REVALIDATE_CONTENT_LIST,
  REVALIDATE_LOCATION_LIST,
  REVALIDATE_TOUR_LIST,
  REVALIDATE_TOUR_TYPE,
} from "@/lib/keys";
import {
  getContentData,
  getDestination,
  getTourTypes,
  getTours,
} from "@/lib/operations";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FunctionComponent } from "react";

// export async function generateMetadata({
//   params,
// }: {
//   params: { destination: string };
// }): Promise<Metadata> {
//   const response = (await getDestination())?.results?.find(
//     (x) => x.slug == decodeURIComponent(params.destination) && x.is_active
//   );
//   if (!response) {
//     return {
//       title: "No destination found",
//     };
//   }

//   const { description, tags, title } = response.seo || {
//     title: "",
//     description: "",
//     tags: "",
//   };
//   return {
//     metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
//     title: title,
//     description: description,
//     openGraph: {
//       title: title,
//       description: description,
//       type: "website",
//       siteName: "Adviser holidays",
//     },
//     keywords: tags,
//   };
// }

// export async function generateStaticParams() {
//   const response = await getDestination();
//   if (response.success && response.results && response.results.length > 0) {
//     return response.results
//       .filter((x) => x.is_active)
//       .map((dest) => ({
//         destination: `${dest.slug}`,
//       }));
//   }
//   return [];
// }

const TourDestinationListingPage: FunctionComponent<{
  params: { destination: string };
}> = async ({ params }) => {
  let tours_ids: number[] = [];
  const destination = await getDestination();
  const currentDest = destination.results?.find(
    (x) => x.slug == decodeURIComponent(params.destination) && x.is_active
  );

  if (!currentDest) return notFound();
  currentDest?.location_attributes?.map((x) => {
    tours_ids = [
      ...tours_ids,
      ...(x.location_tours?.map((g) => g.tour_id) ?? []),
    ];
  });

  const query = new QueryClient();
  await Promise.allSettled([
    query.prefetchQuery({
      queryKey: [REVALIDATE_LOCATION_LIST],
      queryFn: getDestination,
    }),
    query.prefetchQuery({
      queryKey: [REVALIDATE_TOUR_LIST],
      queryFn: getTours,
    }),
    query.prefetchQuery({
      queryKey: [REVALIDATE_TOUR_TYPE],
      queryFn: getTourTypes,
    }),
    query.prefetchQuery({
      queryKey: [REVALIDATE_CONTENT_LIST],
      queryFn: getContentData,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <TourRendering tourIds={tours_ids} />
    </HydrationBoundary>
  );
};

export default TourDestinationListingPage;
