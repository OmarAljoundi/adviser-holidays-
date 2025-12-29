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
import { Textarea } from "@/components/ui/textarea";

export function FAQSettingsForm() {
  const { control, setValue, watch } = useFormContext<SettingSchema>();
  const { append, remove } = useFieldArray({
    control,
    name: "home.faq",
  });

  const watchFields = watch("home.faq");

  const appendNewEmpty = () => {
    append({
      id: crypto.randomUUID(),
      title: "",
      description: "",
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
          <CardTitle>Faq section</CardTitle>
          <CardDescription>
            This will appear in the (Faq section) for the website
          </CardDescription>
        </CardHeader>
        <Separator className="my-2" />

        <CardContent className="pt-2">
          <CreatableTabs
            uniqueId="id"
            orientation="mixed"
            collisionDetection={closestCorners}
            value={watchFields || []}
            onValueChange={(e) => {
              setValue("home.faq", e);
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
                    name={`home.faq.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="h-max w-full">
                        <FormLabel>Question Title</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل عنوان السؤال" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`home.faq.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="h-max w-full">
                        <FormLabel>Question Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="أدخل التفاصيل للسؤال"
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
    </div>
  );
}
