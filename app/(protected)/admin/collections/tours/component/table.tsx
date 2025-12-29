"use client";
import React from "react";
import { DataTable } from "@/components/data-table/data-table";
import { getTourColumns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDataTable } from "@/hooks/use-data-table";
import { tourQuery } from "@/server/tours.server";
import { queryTourSchema } from "@/schema";

export function TourTable({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof tourQuery>;
}) {
  const data = React.use(dataPromise);
  const columns = React.useMemo(() => getTourColumns(), []);
  const dataParsed = React.useMemo(
    () => data.map((o) => queryTourSchema.parse(o)),
    [data]
  );
  const { table } = useDataTable({
    data: dataParsed ?? [],
    columns,
    rowCount: data?.length ?? 0,
    initialState: {
      columnPinning: { right: ["actions"] },
    },
  });

  return (
    <DataTable table={table}>
      <div className="flex items-center justify-between">
        <Link href={"/admin/collections/tours/new"}>
          <Button size={"sm"}>Create new tour</Button>
        </Link>
      </div>
    </DataTable>
  );
}
