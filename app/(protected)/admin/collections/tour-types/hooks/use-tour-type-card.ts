import { revalidateStaticPages } from "@/server/revalidation.server";
import { tourTypeUpdateOrders } from "@/server/tour-types.server";
import { useMutation } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

export function useTourTypeCard() {
  const uniqueId = useId();
  const sortingUpdateMutation = useMutation({
    mutationFn: async ({ data }: { data: { id: number; order: number }[] }) => {
      const result = await tourTypeUpdateOrders(data);
      await revalidateStaticPages();
      return result;
    },
    mutationKey: ["Order-update-tour-types", uniqueId],
    onError: () => {
      toast.error("Failed to update order", {
        description:
          "Your tour type order couldn't be updated, please try again",
      });
    },
    onSuccess: () => {
      toast.success("Order updated", {
        description: "Your tour types have been reordered successfully",
      });
    },
  });

  return { sortingUpdateMutation };
}
