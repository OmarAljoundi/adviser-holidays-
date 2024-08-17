import { getTours } from "@/lib/operations";
import { notFound } from "next/navigation";
import { FunctionComponent } from "react";
import TourBreadcrumb from "./tour-breadcrumb";
import TourImages from "./tour-images";
import TourInitailInfo from "./tour-initail-info";
import TourSectionInfo from "./tour-section-info";
import TourPlan from "./tour-plan";
import TourBenfits from "./tour-benfits";
import TourHotels from "./tour-hotels";
import TourRelated from "./tour-related";
import { Metadata } from "next";
import TourAdditionalInfo from "./tour-additional-info";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const response = (await getTours())?.find(
    (x) => x.slug == decodeURIComponent(params.slug) && x.is_active
  );
  if (!response) {
    return {
      title: "No tour found",
    };
  }

  const { description, tags, title } = response.seo || {
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
  const response = await getTours();
  if (response && response.length > 0) {
    return response
      .filter((x) => x.is_active)
      .map((tour) => ({
        slug: `${tour.slug}`,
      }));
  }
  return [];
}

const TourPage: FunctionComponent<{ params: { slug: string } }> = async ({
  params,
}) => {
  const tour = (await getTours())?.find(
    (x) => x.slug == decodeURIComponent(params.slug) && x.is_active
  );

  if (!tour) return notFound();

  return (
    <div className="container mb-10">
      <div className="space-y-4">
        <TourBreadcrumb tour={tour} />
        <TourSectionInfo tour={tour} />
        <div className="grid grid-cols-2 justify-between gap-x-2">
          <TourInitailInfo tour={tour} />
          <TourImages tour={tour} />
        </div>
        {tour.additional_Info && <TourAdditionalInfo additionalInfo={tour.additional_Info} />}
        <TourPlan tour={tour} />
        <TourBenfits tour={tour} />
        {tour?.tour_hotels && tour?.tour_hotels.length > 0 && (
          <TourHotels tour={tour} />
        )}
        <TourRelated tour={tour} />
      </div>
    </div>
  );
};

export default TourPage;
