import ContentWrapper from "@/components/admin-panel/contet-wrapper";
import { tourSingleQuery } from "@/server/tours.server";
import { createTourSchema } from "@/schema";
import { CreateTour } from "../../component/create";
import { notFound } from "next/navigation";

async function getTour(id: string) {
  const tour = await tourSingleQuery({ where: { id: Number(id) } });

  if (!tour) return notFound();

  return await createTourSchema.parseAsync(tour);
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: paramsId } = await params;

  const parsedTour = await getTour(paramsId);

  return (
    <ContentWrapper
      breadcrumbs={[
        { item: "Dashboard", url: "/admin" },
        { item: "All Tours", url: "/admin/collections/tours" },
        { item: `Duplicate tour '${parsedTour.name}'`, currentPage: true },
      ]}
    >
      <CreateTour tour={parsedTour} />
    </ContentWrapper>
  );
}
