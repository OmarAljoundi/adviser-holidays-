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
import {  getDestinations } from "@/server/public-query.server";
import HeroSlides from "./components/hero-slides";
import { getSettingBySectionAsync } from "@/server/settings.server";
import { seoSchema } from "@/schema/seo-schema";
import { generatePageSeo } from "@/lib/generate-seo";

export async function generateMetadata(): Promise<Metadata> {
  const { seoStaticPagesHome } = (await getSettingBySectionAsync(
    "CMS"
  ));

  const parsedSeo = seoSchema.parse(seoStaticPagesHome?.seo ?? {});

  const dictionary = generatePageSeo(parsedSeo, "/");
  return dictionary;
}



export default async function Home() {
  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: [REVALIDATE_CONTENT_LIST],
    queryFn: () => getSettingBySectionAsync("CMS"),
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
