"use client";

import { SettingSchema } from "@/schema/setting-schema";
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
import { CreatableTabs } from "@/components/ui/creatable-tabs";
import { closestCorners } from "@dnd-kit/core";
import { ImageUpload } from "@/components/image-upload";
import { TourSelector } from "./tour-selector";
import { FAQSettingsForm } from "./faq-setting-form";

export function HomeSettingsForm() {
  const { control, setValue, watch } = useFormContext<SettingSchema>();
  const { append, remove } = useFieldArray({
    control,
    name: "home.homehero",
  });

  const watchFields = watch("home.homehero");

  const appendNewEmpty = () => {
    append({
      id: crypto.randomUUID(),
      title: "",
      subtitle: "",
      media: { url: "" },
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
          <CardTitle>Home heros section</CardTitle>
          <CardDescription>
            This will appear in the home page (home hero section) for the
            website
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />

        <CardContent className="pt-2">
          <CreatableTabs
            uniqueId="id"
            orientation="horizontal"
            collisionDetection={closestCorners}
            value={watchFields || []}
            onValueChange={(e) => {
              setValue("home.homehero", e);
            }}
            buttonTitle={getButtonTitle}
            onAddNewTab={appendNewEmpty}
            onTabRemove={remove}
            overlay={<div className="size-full rounded-md bg-primary/10" />}
          >
            {(index) => (
              <div className="flex justify-between gap-x-4" key={index}>
                <div className="flex-grow flex flex-row gap-x-2 ">
                  <FormField
                    control={control}
                    name={`home.homehero.${index}.media`}
                    render={({ field }) => (
                      <FormItem className="w-full space-y-2">
                        <FormItem>Desktop Image</FormItem>
                        <FormControl>
                          <ImageUpload
                            bucketName="Adviser"
                            folderPath="tour_images"
                            variants="rectangular"
                            maxSizeMB={5}
                            showExistingFiles={true}
                            value={field.value?.url}
                            onChange={(url) =>
                              field.onChange({ ...field.value, url })
                            }
                            altText={field.value?.alt}
                            onAltTextChange={(alt) =>
                              field.onChange({ ...field.value, alt })
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`home.homehero.${index}.mobile_media`}
                    render={({ field }) => (
                      <FormItem className="w-full space-y-2">
                        <FormItem>Mobile Image</FormItem>
                        <FormControl>
                          <ImageUpload
                            bucketName="Adviser"
                            folderPath="tour_images"
                            variants="rectangular"
                            maxSizeMB={5}
                            showExistingFiles={true}
                            value={field.value?.url}
                            onChange={(url) =>
                              field.onChange({ ...field.value, url })
                            }
                            altText={field.value?.alt}
                            onAltTextChange={(alt) =>
                              field.onChange({ ...field.value, alt })
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-y-2 flex-1">
                  <FormField
                    control={control}
                    name={`home.homehero.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="h-max w-full">
                        <FormLabel> Title</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل عنوان الصورة" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`home.homehero.${index}.subtitle`}
                    render={({ field }) => (
                      <FormItem className="h-max w-full">
                        <FormLabel>Subtitle</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="أدخل العنوان الفرعي للصورة"
                            {...field}
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
      {/* <Card>
        <CardHeader>
          <CardTitle>Best tours section</CardTitle>
          <CardDescription>
            This will appear in the home page (best tours section) for the
            website
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />

        <CardContent className="pt-2">
          <TourSelector />
        </CardContent>
      </Card>
      <FAQSettingsForm /> */}
    </div>
  );
}
