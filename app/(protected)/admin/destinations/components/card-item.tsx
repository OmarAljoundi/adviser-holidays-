import { QueryLocationSchema } from "@/schema";
import React, { useState, useCallback, memo } from "react";
import { useLocationCard } from "../hooks/use-location-card";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Edit,
  Eye,
  EyeOff,
  Grip,
  Link,
  SearchCode,
  Trash2,
  Unlink,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LocationForm } from "./form";
import { DeleteAlert } from "@/components/delete-alert";
import { locationDelete } from "@/server/location.server";

import { SortableDragHandle } from "@/components/ui/sortable";
import { LocationAttributesForm } from "./assign-tours/index";
import { SeoDialogForm } from "./seo-dialog-form";
import { revalidateDestination } from "@/server/revalidation.server";

// eslint-disable-next-line react/display-name
const LocationBadge = memo(({ isActive }: { isActive: boolean }) =>
  !isActive ? (
    <Badge
      variant="secondary"
      className="bg-white/90 text-gray-700 dark:bg-gray-800/90 dark:text-gray-200 text-xs font-medium border border-gray-200 dark:border-gray-700"
    >
      Inactive
    </Badge>
  ) : (
    <Badge
      variant="default"
      className="bg-green-500/90 text-white text-xs font-medium"
    >
      Active
    </Badge>
  )
);

// eslint-disable-next-line react/display-name
const FeatureBadge = memo(
  ({ enabled, label }: { enabled: boolean; label: string }) => (
    <Badge
      variant="outline"
      className="flex items-center gap-1.5 text-xs font-medium border bg-input"
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full w-4 h-4 min-w-4",
          enabled ? "bg-green-500 text-white" : "bg-red-500 text-white"
        )}
      >
        {enabled ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      </span>
      {label}
    </Badge>
  )
);

const AttributeBadge = ({
  id,
  title,
  count = 0,
}: {
  id: number;
  title: string | null | undefined;
  count?: number;
}) => (
  <Badge
    key={id}
    variant="outline"
    className="flex items-center gap-1.5 px-2 py-1 rounded-lg border-primary border-dashed"
  >
    {count > 0 && (
      <span className="inline-flex items-center justify-center bg-primary/10 text-primary text-xs font-semibold rounded-full w-5 h-5 min-w-5">
        {count}
      </span>
    )}
    <span className="text-xs font-medium font-arabic-body">{title}</span>
  </Badge>
);

const AttributesDisplay = ({
  attributes = [],
  maxVisible = 3,
  className,
}: {
  attributes: Array<{
    id: number;
    title: string | null | undefined;
    locationTours?: any[];
  }>;
  maxVisible?: number;
  className?: string;
}) => {
  const hasMoreThanMax = attributes.length > maxVisible;

  if (!attributes || attributes.length === 0) return null;

  const visibleAttributes = attributes.slice(0, maxVisible);

  const hiddenCount = attributes.length - maxVisible;

  return (
    <div className={cn("relative", className)}>
      <div className="flex flex-wrap flex-row-reverse gap-2">
        {visibleAttributes.map(({ id, title, locationTours }) => (
          <AttributeBadge
            key={id}
            id={id}
            title={title}
            count={locationTours?.length ?? 0}
          />
        ))}

        {hasMoreThanMax && (
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg border-primary border-dashed"
          >
            <span className="inline-flex items-center justify-center  text-primary text-xs font-semibold rounded-full w-5 h-5 min-w-5">
              {hiddenCount} +
            </span>
          </Badge>
        )}
      </div>
    </div>
  );
};
// eslint-disable-next-line react/display-name
const SeoBadge = memo(({ location }: { location: QueryLocationSchema }) => {
  const isSeoComplete = Boolean(
    location.seo?.title &&
      location.seo.title.trim() !== "" &&
      location.seo?.description &&
      location.seo.description.trim() !== ""
  );

  return (
    <Badge
      variant="outline"
      className="flex items-center gap-1.5 text-xs font-medium border bg-input"
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full w-4 h-4 min-w-4",
          isSeoComplete ? "bg-green-500 text-white" : "bg-red-500 text-white"
        )}
      >
        {isSeoComplete ? (
          <Check className="h-3 w-3" />
        ) : (
          <X className="h-3 w-3" />
        )}
      </span>
      SEO
    </Badge>
  );
});

function CardItemComponent(location: QueryLocationSchema) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openSeo, setOpenSeo] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAttribute, setOpenAttribute] = useState(false);
  const { cardUpdateMutation } = useLocationCard();

  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenEdit(true);
  }, []);

  const handleAttributeClick = useCallback(() => {
    setOpenAttribute(true);
  }, []);

  const handleDeleteClick = useCallback(() => {
    setOpenDelete(true);
  }, []);

  const handleVisibilityToggle = useCallback(() => {
    cardUpdateMutation.mutate({
      id: location.id,
      data: { isActive: !location.isActive },
      oldSlug: location.slug,
    });
  }, [cardUpdateMutation, location.id, location.slug, location.isActive]);

  const handleOpenSeo = useCallback(() => {
    setOpenSeo(true);
  }, []);

  const handleEuropeToggle = useCallback(() => {
    cardUpdateMutation.mutate({
      id: location.id,
      data: { showOnEurope: !location.showOnEurope },
      oldSlug: location.slug,
    });
  }, [cardUpdateMutation, location.id, location.showOnEurope, location.slug]);

  const handleServiceToggle = useCallback(() => {
    cardUpdateMutation.mutate({
      id: location.id,
      data: { showOnService: !location.showOnService },
      oldSlug: location.slug,
    });
  }, [cardUpdateMutation, location.id, location.showOnService, location.slug]);

  return (
    <React.Fragment>
      <Card className="group overflow-hidden border border-border/40 transition-all duration-300 hover:shadow-md h-full">
        <CardContent className="p-0">
          <div className="relative aspect-video overflow-hidden">
            {location.image && (
              <Image
                src={location.image.url}
                alt={location.image.alt ?? "Alt preview"}
                fill
                sizes="(min-width: 640px) 192px, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            )}

            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              <LocationBadge isActive={location.isActive} />
              <SeoBadge location={location} />
            </div>

          

            <div className="absolute top-2 right-2 flex flex-col gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <SortableDragHandle className="p-0 h-8 w-8" variant="outline">
                    <Grip className="h-4 w-4" />
                  </SortableDragHandle>
                </TooltipTrigger>
                <TooltipContent>Drag to sort</TooltipContent>
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
                <TooltipContent>Edit destination</TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={handleOpenSeo}
                    className="flex items-center gap-2"
                  >
                    <SearchCode className="h-4 w-4" />
                    <span>Configure Seo</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleVisibilityToggle}
                    className="flex items-center gap-2"
                  >
                    {location.isActive ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span>{location.isActive ? "Deactivate" : "Activate"}</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleAttributeClick}
                    className="flex items-center gap-2"
                  >
                    <Link className="h-4 w-4" />
                    <span>Assign to tours</span>
                  </DropdownMenuItem>

                 

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleDeleteClick}
                    className="flex items-center gap-2 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="p-3">
            <div className="flex flex-col gap-1 text-right">
              <h3 className="font-medium text-base truncate font-arabic-header">
                {location.name}
              </h3>
              <p className="text-muted-foreground text-xs truncate font-arabic-body">
                {location.slug}
              </p>
              <div className="flex flex-col gap-1 mt-2">
                <AttributesDisplay
                  attributes={(location.attributes as any) ?? []}
                  maxVisible={1}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <SeoDialogForm
        defaultValues={location}
        onOpenChange={setOpenSeo}
        open={openSeo}
      />

      <LocationAttributesForm
        location={location}
        onOpenChange={setOpenAttribute}
        open={openAttribute}
      />
      <LocationForm
        onOpenChange={setOpenEdit}
        open={openEdit}
        defaultValues={location}
      />
      <DeleteAlert
        open={openDelete}
        onOpenChange={setOpenDelete}
        itemName={location.name}
        deleteFunction={() => locationDelete({ where: { id: location.id } })}
        mutationOptions={{
          mutationKey: ["Delete-Location", location.id],
        }}
      />
    </React.Fragment>
  );
}

export const CardItem = memo(CardItemComponent);
