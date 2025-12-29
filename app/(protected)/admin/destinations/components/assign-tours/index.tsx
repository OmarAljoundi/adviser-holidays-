"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { queryLocationSchema, QueryLocationSchema } from "@/schema";
import { locationSingleQuery, locationUpdate } from "@/server/location.server";
import { toast } from "sonner";
import { formSchema, FormValues } from "./lib";
import { AttributesList } from "./attributes-list";
import { AttributeDetails } from "./attribute-details";
import { Skeleton } from "@/components/ui/skeleton";
import { revalidateDestination } from "@/server/revalidation.server";
import { useTransitionStore } from "@/hooks/use-global-transition";

interface LocationAttributesFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: QueryLocationSchema;
}

export function LocationAttributesForm({
  open,
  onOpenChange,
  location,
}: LocationAttributesFormProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["attrfor", location.id],
    queryFn: () =>
      locationSingleQuery({
        where: { id: location.id },
        include: {
          attributes: {
            include: {
              locationTours: {
                include: {
                  locationAttr: true,
                  location: true,
                  tour: { include: { tourType: true } },
                },
              },
            },
          },
        },
      }),
    enabled: open,
    select: (data) => {
      return queryLocationSchema.parse(data);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-5xl flex flex-col max-h-[80vh] h-[80vh] overflow-hidden px-4"
        onPointerDownCapture={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Spacebar") e.stopPropagation();
        }}
      >
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Edit Location Attributes</DialogTitle>
          <DialogDescription>
            Manage attributes and assign tours for the location.
          </DialogDescription>
        </DialogHeader>
        {isLoading && <InternalFormLoading />}
        {data && <InternalForm location={data} onOpenChange={onOpenChange} />}
      </DialogContent>
    </Dialog>
  );
}

function InternalForm({
  location,
  onOpenChange,
}: {
  location: QueryLocationSchema;
  onOpenChange: (value: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const route = useTransitionStore();

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      await locationUpdate(data);
      await revalidateDestination();
    },
    onSuccess: () => {
      toast.success("Location attributes updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["attrfor", location.id] });
      onOpenChange(false);
      route.refresh();
    },
    onError: (error) => {
      console.error("Error updating location:", error);
      toast.error("Error updating location", {
        description: "There was a problem updating the location attributes.",
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: location?.id,
      name: location?.name || "",
      deletedAttributes: [],
      attributes:
        location?.attributes?.map((attr) => ({
          id: attr.id,
          title: attr.title || "",
          order: attr.order || 0,
          tours:
            attr.locationTours?.map((lt) => ({
              id: lt.tour?.id,
              name: lt.tour?.name,
              image: lt.tour?.images?.[0],
              tourType: lt.tour?.tourType,
            })) || [],
        })) || [],
    },
  });

  const watchDeletedAttributes = form.watch("deletedAttributes");

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "attributes",
    keyName: "customId",
  });

  async function onSubmit(data: FormValues) {
    const formattedData = {
      where: { id: data.id },
      data: {
        name: data.name,
        attributes: {
          upsert: data.attributes.map((attr, index) => ({
            where: { id: attr.id || 0 },
            update: {
              title: attr.title,
              order: index,
              locationTours: {
                deleteMany: {},
                create: attr.tours.map((tour) => ({
                  tourId: tour.id,
                  locationId: data.id,
                })),
              },
            },
            create: {
              title: attr.title,
              order: index,
              locationTours: {
                create: attr.tours.map((tour) => ({
                  tourId: tour.id,
                  locationId: data.id,
                })),
              },
            },
          })),
          deleteMany: data.deletedAttributes,
        },
      },
      include: {
        attributes: {
          include: {
            locationTours: {
              include: {
                tour: {
                  include: {
                    tourType: true,
                  },
                },
              },
            },
          },
        },
      },
    };

    updateMutation.mutate(formattedData);
  }

  const handleAttributeMove = ({
    activeIndex,
    overIndex,
  }: {
    activeIndex: number;
    overIndex: number;
  }) => {
    move(activeIndex, overIndex);
  };

  const handleAddAttribute = () => {
    append({ title: `New Attribute ${fields.length + 1}`, tours: [] });
    setTimeout(() => {
      setActiveTab(String(fields.length));
    }, 0);
  };

  const handleRemoveAttribute = (index: number, id: number) => {
    remove(index);
    setActiveTab(null);

    if (id)
      form.setValue("deletedAttributes", [...watchDeletedAttributes ?? [], { id }]);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col flex-1 h-full overflow-hidden"
      >
        <div className="flex flex-col flex-1 overflow-hidden px-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-shrink-0 mb-4">
                <FormLabel>Location Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row gap-2 flex-1 min-h-0 overflow-hidden">
            <AttributesList
              fields={fields as any}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleAttributeMove={handleAttributeMove}
              handleAddAttribute={handleAddAttribute}
              handleRemoveAttribute={handleRemoveAttribute}
            />

            <AttributeDetails
              fields={fields}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleAddAttribute={handleAddAttribute}
            />
          </div>
        </div>

        <DialogFooter className="mt-6 border-t pt-6 flex-shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

const InternalFormLoading = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <div className="flex flex-col flex-1 overflow-hidden px-2">
          <div className="flex-shrink-0 mb-4 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="flex flex-row gap-2 flex-1 min-h-0 overflow-hidden">
            <div className="w-1/3 border rounded-md p-4 flex flex-col overflow-hidden">
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="space-y-2 overflow-y-auto flex-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={`list-item-${i}`} className="h-10 w-full" />
                  ))}
              </div>
              <Skeleton className="h-9 w-full mt-4" />
            </div>

            <div className="w-2/3 border rounded-md p-4 flex flex-col">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-4 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
