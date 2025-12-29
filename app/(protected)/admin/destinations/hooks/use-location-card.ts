import { Prisma } from "@/generated/prisma/client";
import { useTransitionStore } from "@/hooks/use-global-transition";
import { locationUpdate, locationUpdateOrders } from "@/server/location.server";
import { revalidateDestination } from "@/server/revalidation.server";
import { useMutation } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

export function useLocationCard() {
  const uniqueId = useId();
  const route = useTransitionStore();

  const cardUpdateMutation = useMutation({
    mutationFn: async ({
      data,
      id,
      oldSlug,
    }: {
      id: number;
      oldSlug: string;
      data: Prisma.SelectSubset<
        Prisma.LocationUpdateArgs,
        Prisma.LocationUpdateArgs
      >["data"];
    }) => {
      await locationUpdate({ where: { id }, data });
      await revalidateDestination(data.slug! as string);
      await revalidateDestination(oldSlug);
    },
    mutationKey: ["Action-update", uniqueId],
    onSuccess: () => {
      toast.success("Destination updated", {
        description: "Your destination was updated successfully",
      });
      route.refresh();
    },
    onError: () => {
      toast.error("Failed to update", {
        description:
          "Your destination couldn't be updated, please contact your admin",
      });
    },
  });

  const sortingUpdateMutation = useMutation({
    mutationFn: async ({ data }: { data: { id: number; order: number }[] }) => {
      return await locationUpdateOrders(data);
    },
    mutationKey: ["Order-update", uniqueId],
    onError: () => {
      toast.error("Failed to update order", {
        description:
          "Your destination order couldn't be updated, please try again",
      });
    },
    onSuccess: () => {
      toast.success("Order updated", {
        description: "Your destinations have been reordered successfully",
      });
    },
  });

  return { cardUpdateMutation, sortingUpdateMutation };
}
