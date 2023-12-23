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

export async function generateMetadata({
  params,
}: {
  params: { destination: string; section: string };
}): Promise<Metadata> {
  const response = (await getDestination())?.results?.find(
    (x) => x.slug == decodeURIComponent(params.destination) && x.is_active
  );
  const attr = response?.location_attributes?.find(
    (x) => x.title == decodeURIComponent(params.section.replaceAll("-", " "))
  );
  if (!attr) {
    return {
      title: "No section found",
    };
  }

  const { description, tags, title } = attr.seo || {
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

export async function generateStaticParams() {
  const response = await getDestination();
  var results: { destination: string; section: string }[] = [];

  response?.results
    ?.filter((x) => x.is_active)
    .map((dest) => {
      if (dest.location_attributes && dest.location_attributes.length > 1) {
        dest.location_attributes?.map((attr) => {
          results.push({
            destination: dest.slug!,
            section: attr.title!.replaceAll(" ", "-"),
          });
        });
      }
    });

  return results;
}

const TourDestinationSectionListingPage: FunctionComponent<{
  params: { destination: string; section: string };
}> = async ({ params }) => {
  const destination = await getDestination();

  const currentDest = destination.results?.find(
    (x) => x.slug == decodeURIComponent(params.destination) && x.is_active
  );

  const attr = currentDest?.location_attributes?.find(
    (x) => x.title == decodeURIComponent(params.section.replaceAll("-", " "))
  );
  if (!attr) return notFound();
  const tourIds = attr?.location_tours?.map((x) => x.tour_id!);

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
      <TourRendering tourIds={tourIds} />
    </HydrationBoundary>
  );
};

export default TourDestinationSectionListingPage;
