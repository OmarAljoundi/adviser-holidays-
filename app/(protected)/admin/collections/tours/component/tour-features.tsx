"use client";

import React, { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreatableTabs } from "@/components/ui/creatable-tabs";
import { closestCorners } from "@dnd-kit/core";
import { QueryTourSchema } from "@/schema";

type FieldKeyMap = "tourSections" | "tourIncludes" | "tourExcludes";

const tourFeaturesMapper: Record<FieldKeyMap, { title: string; desc: string }> =
  {
    tourExcludes: {
      title: "Excluded from the Trip",
      desc: "Specify here what is not included in this tour package, such as meals, transportation, or additional fees.",
    },
    tourIncludes: {
      title: "Included in the Trip",
      desc: "List here all the amenities, services, and experiences that are part of this tour, such as accommodation, meals, guided tours, and transportation.",
    },
    tourSections: {
      title: "Tour Sections",
      desc: "Divide the tour into different sections or segments, outlining each phase of the journey, including activities, sightseeing, and experiences.",
    },
  };

export function TourFeatures({ fieldKey }: { fieldKey: FieldKeyMap }) {
  const { control, setValue, watch } = useFormContext<QueryTourSchema>();
  const { append, remove } = useFieldArray({
    control,
    name: fieldKey,
  });

  const watchFields = watch(fieldKey);

  const appendNewEmpty = () => {
    append({
      id: crypto.randomUUID(),
      uuid: crypto.randomUUID(),
      description: "",
      title: "",
    });
  };

  const getButtonTitle = useCallback(
    (index: number) => {
      return (watchFields || [])[index]?.title || `New Tab ${index + 1}`;
    },
    [watchFields]
  );

  return (
    <div className="flex flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{tourFeaturesMapper[fieldKey].title}</CardTitle>
          <CardDescription>{tourFeaturesMapper[fieldKey].desc}</CardDescription>
        </CardHeader>
        <Separator className="my-2" />

        <CardContent className="pt-2">
          <CreatableTabs
            uniqueId="id"
            orientation="mixed"
            collisionDetection={closestCorners}
            value={watchFields || []}
            onValueChange={(e) => {
              setValue(fieldKey, e);
            }}
            buttonTitle={getButtonTitle}
            onAddNewTab={appendNewEmpty}
            onTabRemove={remove}
            overlay={<div className="size-full rounded-md bg-primary/10" />}
          >
            {(index) => (
              <div className="flex justify-between gap-x-4" key={index}>
                <div className="flex flex-col gap-y-2 flex-1">
                  <FormField
                    control={control}
                    name={`${fieldKey}.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="h-max w-full">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a title..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`${fieldKey}.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="h-max w-full">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a description..."
                            {...field}
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </CreatableTabs>
        </CardContent>
      </Card>
    </div>
  );
}
