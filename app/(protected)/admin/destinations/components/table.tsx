"use client";
import  { use, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { queryLocationSchema } from "@/schema";
import { Plus } from "lucide-react";
import { LocationForm } from "./form";
import { CardsContainer } from "./cards-container";
import { locationQuery } from "@/server/location.server";

export function LocationTable({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof locationQuery>;
}) {
  const rawLocations = use(dataPromise);
  const locations = useMemo(
    () => rawLocations.map((x) => queryLocationSchema.parse(x)),
    [rawLocations]
  );

  const [open, setOpen] = useState(false);

  const newOrder = useMemo(() => {
    return (locations.at(-1)?.order ?? 0) + 1;
  }, [locations]);

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setOpen(true)}
          >
            <Plus className="h-4 w-4" />
            <span>Add new destination</span>
          </Button>
        </div>
      </div>

      <CardsContainer locations={locations} />

      <LocationForm onOpenChange={setOpen} open={open} newOrder={newOrder} />
    </div>
  );
}
