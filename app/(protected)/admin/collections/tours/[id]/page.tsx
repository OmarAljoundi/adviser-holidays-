import { isCreationPage } from "@/lib/utils";
import ContentWrapper from "@/components/admin-panel/contet-wrapper";
import { CreateTour } from "../component/create";
import { UpdateTour } from "../component/update";
import { tourSingleQuery } from "@/server/tours.server";
import { updateTourSchema } from "@/schema";
import { notFound } from "next/navigation";

async function getTour(id: string) {
  const tour = await tourSingleQuery({
    where: { id: Number(id) },
  });

  if (!tour) return notFound();

  return await updateTourSchema.parseAsync(tour);
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: paramsId } = await params;
  const { isCreation, id } = isCreationPage(paramsId);
  const currentBreadcrumb = isCreation
    ? { item: "New Tour" }
    : { item: `Edit Tour ${id}` };

  if (isCreation) {
    return (
      <ContentWrapper
        breadcrumbs={[
          { item: "Dashboard", url: "/admin" },
          { item: "All Tours", url: "/admin/collections/tours" },
          { ...currentBreadcrumb, currentPage: true },
        ]}
      >
        <CreateTour />
      </ContentWrapper>
    );
  }

  const parsedTour = await getTour(id);

  return (
    <ContentWrapper
      breadcrumbs={[
        { item: "Dashboard", url: "/admin" },
        { item: "All Tours", url: "/admin/collections/tours" },
        { ...currentBreadcrumb, currentPage: true },
      ]}
    >
      <UpdateTour tour={parsedTour} />
    </ContentWrapper>
  );
}
