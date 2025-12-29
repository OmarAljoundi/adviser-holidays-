import { tourQuery } from "@/server/tours.server";
import { useQuery } from "@tanstack/react-query";

export function useAssignedTours() {
  const query = useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      return tourQuery({
        select: {
          id: true,
          name: true,
          images: true,
          tourType: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      });
    },
  });

  return query;
}
