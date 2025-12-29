import { QueryLocationSchema } from "@/schema";
import React, { useCallback, useEffect, useState } from "react";
import { useLocationCard } from "../hooks/use-location-card";
import { EmptyState } from "@/components/empty-state";
import { Edit, File, ImageDown } from "lucide-react";
import { Sortable, SortableItem } from "@/components/ui/sortable";
import { closestCorners } from "@dnd-kit/core";
import { CardItem } from "./card-item";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { useTransitionStore } from "@/hooks/use-global-transition";

const MemoizedCardItem = React.memo(CardItem);

// eslint-disable-next-line react/display-name
const MemoizedSortableCardItem = React.memo(
  ({ location }: { location: QueryLocationSchema }) => (
    <SortableItem value={location.order} key={location.order}>
      <MemoizedCardItem {...location} key={`CardItem-${location.id}`} />
    </SortableItem>
  )
);

export function CardsContainer({
  locations,
  isLoading = false,
}: {
  locations: QueryLocationSchema[];
  isLoading?: boolean;
}) {
  const { sortingUpdateMutation } = useLocationCard();
  const { isPending } = useTransitionStore();
  const [localLocations, setLocalLocations] = useState<QueryLocationSchema[]>(
    []
  );

  useEffect(() => {
    setLocalLocations(locations);
  }, [locations]);

  const handleSortingUpdate = useCallback(
    (value: QueryLocationSchema[]) => {
      setLocalLocations(value);

      const updateData = value.map(({ id }, index) => ({
        id,
        order: index + 1,
      }));

      if (sortingUpdateMutation.isPending) return;
      sortingUpdateMutation.mutate({ data: updateData });
    },
    [sortingUpdateMutation]
  );

  if (locations.length === 0 && !isLoading) {
    return (
      <EmptyState
        className="max-w-full bg-card"
        title="You have no destinations"
        description="Start now by creating your first destination"
        icons={[File, Edit, ImageDown]}
      />
    );
  }

  return (
    <div className="relative">
      <LoadingOverlay
        isLoading={sortingUpdateMutation.isPending || isPending}
        spinnerClassName="size-12 w-full text-center"
        loadingText={"Updating..."}
      />

      <Sortable
        uniqueId="order"
        orientation="mixed"
        collisionDetection={closestCorners}
        value={localLocations}
        onValueChange={handleSortingUpdate}
        overlay={<div className="size-full rounded-md bg-primary/10" />}
      >
        <div className="grid gap-6 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 h-full">
          {localLocations.map((location) => (
            <MemoizedSortableCardItem
              key={`sortable-${location.id}`}
              location={location}
            />
          ))}
        </div>
      </Sortable>
    </div>
  );
}
