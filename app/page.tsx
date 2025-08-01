export const revalidate = 0;
import { Suspense } from "react";
import DestinationLoading from "./components/destination-loading";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { REVALIDATE_CONTENT_LIST } from "@/lib/keys";
import { Metadata } from "next";
import FaqList from "./components/faq-list";
import Destination from "./components/destination";
import { getContentData, getDestinations } from "@/server/public-query.server";
import HeroSlides from "./components/hero-slides";

export async function generateMetadata(): Promise<Metadata> {
  const response = await getContentData();

  const { description, tags, title } = response?.home?.seo || {
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
      siteName: "Discovery",
    },
    keywords: tags,
  };
}
export default async function Home() {
  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: [REVALIDATE_CONTENT_LIST],
    queryFn: getContentData,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(query)}>
        <HeroSlides destinationPromise={getDestinations()} />
      </HydrationBoundary>

      <Suspense fallback={<DestinationLoading />}>
        <Destination />
      </Suspense>

      {/* <Suspense fallback={<BestToursLoading />}>
        <BestTours />
      </Suspense> */}
      {/* 
      <Suspense fallback={<TourTypeLoading />}>
        <TourTypes />
      </Suspense> */}

      <Suspense>
        <FaqList />
      </Suspense>
    </div>
  );
}
