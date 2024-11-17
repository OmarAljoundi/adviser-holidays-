export const revalidate = 0;
import ImportDynamic from "next/dynamic";
import { Suspense } from "react";
import DestinationLoading from "./(components)/(first)/destination-loading";
import BestToursLoading from "./(components)/(second)/best-tours-loading";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { REVALIDATE_CONTENT_LIST } from "@/lib/keys";
import { getContentData } from "@/lib/operations";
import TourTypeLoading from "./(components)/(third)/tour-type-loading";
import { Metadata } from "next";
import HeroSlides from "./(components)/(hero)/hero-slides";

const Destination = ImportDynamic(
  () => import("./(components)/(first)/destination"),
  {
    ssr: false,
    loading: () => <DestinationLoading />,
  }
);

const BestTours = ImportDynamic(
  () => import("./(components)/(second)/best-tours"),
  {
    ssr: false,
    loading: () => <BestToursLoading />,
  }
);
// const TourTypes = ImportDynamic(
//   () => import("./(components)/(third)/tour-type"),
//   {
//     ssr: false,
//   }
// );

const Faq = ImportDynamic(() => import("./(components)/(fourth)/faq-list"), {
  ssr: false,
});

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
        <HeroSlides />
      </HydrationBoundary>

      <Suspense fallback={<DestinationLoading />}>
        <Destination />
      </Suspense>

      <Suspense fallback={<BestToursLoading />}>
        <BestTours />
      </Suspense>
{/* 
      <Suspense fallback={<TourTypeLoading />}>
        <TourTypes />
      </Suspense> */}

      <Suspense>
        <Faq />
      </Suspense>
    </div>
  );
}
