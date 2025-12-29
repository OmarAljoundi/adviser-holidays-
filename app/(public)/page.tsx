"use cache";

import { Suspense } from "react";
import DestinationLoading from "./components/destination-loading";
import { Metadata } from "next";
import FaqList from "./components/faq-list";
import { getDestinations } from "@/server/public-query.server";
import HeroSlides from "./components/hero-slides";
import { getSettingBySectionAsync } from "@/server/settings.server";
import { seoSchema } from "@/schema/seo-schema";
import { generatePageSeo } from "@/lib/generate-seo";
import DestinationListing from "./components/destination-listing";
import { cacheTag } from "next/cache";
import { HOME_PAGE } from "@/lib/keys";

export async function generateMetadata(): Promise<Metadata> {
  cacheTag(HOME_PAGE);

  const { seoStaticPagesHome } = await getSettingBySectionAsync("CMS");
  const parsedSeo = seoSchema.parse(seoStaticPagesHome?.seo ?? {});
  return generatePageSeo(parsedSeo, "/");
}

export default async function Home() {
  cacheTag(HOME_PAGE);

  return (
    <div>
      <Suspense
        fallback={
          <div className="h-[600px] w-full bg-gray-100 animate-pulse" />
        }
      >
        <HeroSlides
          destinationPromise={getDestinations()}
          dataContentPromise={getSettingBySectionAsync("CMS")}
        />
      </Suspense>

      <Suspense fallback={<DestinationLoading />}>
        <DestinationListing dataDestination={getDestinations()} />
      </Suspense>

      <Suspense>
        <FaqList />
      </Suspense>
    </div>
  );
}
