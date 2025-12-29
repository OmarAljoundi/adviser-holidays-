"use client";
import React, { use, useCallback, useEffect, useState } from "react";
import { tourTypeQuery } from "@/server/tour-types.server";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Sortable, SortableItem } from "@/components/ui/sortable";
import { closestCorners } from "@dnd-kit/core";
import { useTourTypeCard } from "../hooks/use-tour-type-card";
import { QueryTourTypeSchema } from "@/schema";
import { EmptyState } from "@/components/empty-state";
import { Edit, File, ImageDown, PlusCircle } from "lucide-react";
import { CardItem } from "./card-item";
import { Button } from "@/components/ui/button";
import { TourTypeForm } from "./dialog";
import { useTransitionStore } from "@/hooks/use-global-transition";

const MemoizedCardItem = React.memo(CardItem);

const MemoizedSortableCardItem = React.memo(
  ({ tourType }: { tourType: QueryTourTypeSchema }) => (
    <SortableItem value={tourType.order} key={tourType.order}>
      <MemoizedCardItem {...tourType} key={`CardItem-${tourType.id}`} />
    </SortableItem>
  )
);

export function TourTypesTable({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof tourTypeQuery>;
}) {
  const { isPending } = useTransitionStore();
  const tourTypes = use(dataPromise);
  const [open, setOpen] = useState(false);

  const { sortingUpdateMutation } = useTourTypeCard();
  const [localTourTypes, setLocalTourTypes] = useState<QueryTourTypeSchema[]>(
    []
  );

  useEffect(() => {
    setLocalTourTypes(tourTypes as unknown as QueryTourTypeSchema[]);
  }, [tourTypes]);

  const handleSortingUpdate = useCallback(
    (value: QueryTourTypeSchema[]) => {
      setLocalTourTypes(value);

      const updateData = value.map(({ id }, index) => ({
        id,
        order: index + 1,
      }));

      if (sortingUpdateMutation.isPending) return;
      sortingUpdateMutation.mutate({ data: updateData });
    },
    [sortingUpdateMutation]
  );

  if (tourTypes.length === 0) {
    return (
      <>
      <EmptyState
        className="max-w-full bg-card"
        title="You have no destinations"
        description="Start now by creating your first destination"
        action={{
          label:"Create new tour type",
          onClick:() => setOpen(true)
        }}
        icons={[File, Edit, ImageDown]}
      />
          <TourTypeForm
        onOpenChange={setOpen}
        open={open}
        newOrder={(localTourTypes.at(-1)?.order ?? 0) + 1}
      />
      </>
    );
  }

  return (
    <React.Fragment>
      <LoadingOverlay
        isLoading={sortingUpdateMutation.isPending || isPending}
        spinnerClassName="size-12 w-full text-center"
        loadingText={"Updating..."}
      />
      <div className="w-full  space-y-6">
        <div className="flex justify-end items-center w-full">
          <Button
            onClick={() => setOpen(true)}
            leadingIcon={<PlusCircle className="h-4 w-4" />}
            variant="outline"
            size="sm"
            className="gap-1"
          >
            New tour type
          </Button>
        </div>

        <Sortable
          uniqueId="order"
          orientation="mixed"
          collisionDetection={closestCorners}
          value={localTourTypes}
          onValueChange={handleSortingUpdate}
          overlay={<div className="w-full h-full rounded-md bg-primary/10" />}
        >
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 ">
            {localTourTypes.map((tourType) => (
              <MemoizedSortableCardItem
                key={`sortable-${tourType.id}`}
                tourType={tourType}
              />
            ))}
          </div>
        </Sortable>
      </div>

      <TourTypeForm
        onOpenChange={setOpen}
        open={open}
        newOrder={(localTourTypes.at(-1)?.order ?? 0) + 1}
      />
    </React.Fragment>
  );
}
