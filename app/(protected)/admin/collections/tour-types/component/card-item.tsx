import { QueryTourTypeSchema } from "@/schema";
import React, { useState, useCallback, memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Edit, Grip, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { DeleteAlert } from "@/components/delete-alert";
import { toast } from "sonner";
import { SortableDragHandle } from "@/components/ui/sortable";
import { TourTypeForm } from "./dialog";
import { tourTypeDelete } from "@/server/tour-types.server";

function CardItemComponent(tourType: QueryTourTypeSchema) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenEdit(true);
  }, []);

  const handleDeleteClick = useCallback(() => {
    setOpenDelete(true);
  }, []);

  return (
    <React.Fragment>
      <Card className="group overflow-hidden border border-border/40 transition-all duration-300 hover:shadow-md ">
        <CardContent className="p-0">
          <div className="relative  overflow-hidden pl-4 pt-4">
            {tourType.image?.url ? (
              <Image
                src={tourType.image.url}
                alt={tourType.image.alt ?? "Alt preview"}
                width={150}
                height={150}
                sizes="(min-width: 640px) 192px, 100vw"
                className="object-cover transition-transform duration-300  size-24 rounded-xl dark:bg-white bg-black/20"
              />
            ) : (
              <Image
                src={"/images/no-image.png"}
                alt={"no-image was found"}
                width={150}
                height={150}
                sizes="(min-width: 640px) 192px, 100vw"
                className="object-contain transition-transform duration-300 size-24 rounded-xl dark:bg-white bg-black/20"
              />
            )}

            <div className="absolute top-2 right-2 flex flex-col gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <SortableDragHandle className="p-0 h-8 w-8" variant="outline">
                    <Grip className="h-4 w-4" />
                  </SortableDragHandle>
                </TooltipTrigger>
                <TooltipContent side="left">Drag to sort</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={handleEditClick}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Edit tour type</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={handleDeleteClick}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">Delete tour type</TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="p-3">
            <div className="flex flex-col gap-1 text-right">
              <h3 className="font-medium text-base truncate font-arabic-header">
                {tourType.name}
              </h3>
              <p className="text-muted-foreground text-xs truncate font-arabic-body">
                {tourType.showOnService}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <TourTypeForm
        onOpenChange={setOpenEdit}
        open={openEdit}
        defaultValues={tourType as unknown as QueryTourTypeSchema}
      />
      <DeleteAlert
        open={openDelete}
        onOpenChange={setOpenDelete}
        itemName={tourType.name}
        deleteFunction={() => tourTypeDelete({ where: { id: tourType.id } })}
        mutationOptions={{
          mutationKey: ["Delete-tourType", tourType.id],
          onSuccess: () => {
            toast.success("Tour Type has been deleted successfully");
          },
        }}
      />
    </React.Fragment>
  );
}

export const CardItem = memo(CardItemComponent);
