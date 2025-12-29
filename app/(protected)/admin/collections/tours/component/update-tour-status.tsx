import { Switch } from "@/components/ui/switch";
import { tourUpdate } from "@/server/tours.server";
import { QueryTourSchema } from "@/schema";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { revalidateTour } from "@/server/revalidation.server";

export function UpdateTourStatus({ row }: { row: QueryTourSchema }) {
  const route = useRouter();
  const [active, setActive] = useState<boolean>(row.isActive ?? false);
  const handleUpdateStatus = async (e: boolean) => {
    setActive(e);
    toast.promise(
      tourUpdate({
        where: { id: row.id! },
        data: { isActive: { set: !row.isActive } },
      }),
      {
        error(error) {
          setActive(!e);
          return error;
        },
        loading: "Updating tour status in progress ..",
        async success(data) {
          await revalidateTour(data.slug!);
          route.refresh();
          return `Tour ${data.name} status has been updated successfully`;
        },
      }
    );
  };
  return (
    <div className="w-32 flex items-center justify-between">
      <Switch
        defaultChecked
        checked={active}
        onCheckedChange={(e) => handleUpdateStatus(e)}
      />
    </div>
  );
}
