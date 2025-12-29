import { notFound } from "next/navigation";
import { FunctionComponent, Suspense } from "react";
import TourBreadcrumb from "./tour-breadcrumb";
import TourImages from "./tour-images";
import TourInitailInfo from "./tour-initail-info";
import TourSectionInfo from "./tour-section-info";
import TourPlan from "./tour-plan";
import TourBenfits from "./tour-benfits";
import TourHotels from "./tour-hotels";
import TourAdditionalInfo from "./tour-additional-info";
import { getTourDetails } from "@/server/public-query.server";
import LoadingTour from "./loading-tour";

const TourPage: FunctionComponent<{
  params: Promise<{ slug: string }>;
}> = async ({ params }) => {

  return (
    <Suspense fallback={<LoadingTour />}>
      <RenderTourPage params={params} />
    </Suspense>
  );
};

async function RenderTourPage({ params }: { params: Promise<{ slug: string }> }) {
  "use cache";
  const {slug} = await params
  const result = await getTourDetails(decodeURIComponent(slug));

  if (!result) return notFound();

  const tour = result;
  return (
    <div className="container mb-10">
      <div className="space-y-4">
        <TourBreadcrumb tour={tour} />
        <TourSectionInfo tour={tour} />
        <div className="grid grid-cols-2 justify-between gap-x-2">
          <TourInitailInfo tour={tour} />
          <TourImages tour={tour} />
        </div>
        {tour.additionalInfo && (
          <TourAdditionalInfo additionalInfo={tour.additionalInfo} />
        )}
        <TourPlan tour={tour} />
        <TourBenfits tour={tour} />
        {tour?.tourHotels && tour?.tourHotels.length > 0 && (
          <TourHotels tour={tour} />
        )}
        {/* <TourRelated tour={tour} /> */}
      </div>
    </div>
  );
}
export default TourPage;
