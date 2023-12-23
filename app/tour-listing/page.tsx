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
import { FunctionComponent } from "react";

interface TourListingPageProps {}

export async function generateMetadata(): Promise<Metadata> {
  const response = await getContentData();

  const { description, tags, title } = response?.best_tours?.seo || {
    title: "",
    description: "",
    tags: "",
  };
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: "website",
      siteName: "Adviser holidays",
    },
    keywords: tags,
  };
}
const TourListingPage: FunctionComponent<TourListingPageProps> = async () => {
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
      <TourRendering />
    </HydrationBoundary>
  );
};

export default TourListingPage;
