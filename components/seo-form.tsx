"use client";

import React from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tag, TagInput } from "emblor";
import { useFormContext } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "./ui/separator";
import { ImageUpload } from "./image-upload";

export function SeoForm({
  prefiex,
  ...rest
}: {
  prefiex?: string;
  title?: string;
  description?: string;
}) {
  const title = rest.title || "Configure SEO for this page";
  const description =
    rest.description || "Here you can configure the seo for this page!";
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <Separator className="my-2" />

      <CardContent className="space-y-4">
        <SeoFormInputs prefiex={prefiex} />
      </CardContent>
    </Card>
  );
}

export function SeoFormInputs({ prefiex = "" }: { prefiex?: string }) {
  const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(
    null
  );
  const { control } = useFormContext();

  const controlPrefix = prefiex ? `${prefiex}.seo` : "seo";

  return (
    <div className=" py-3">
      <FormField
        control={control}
        name={`${controlPrefix}.title`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel> Meta Title</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ""}
                placeholder={`Enter a meta title`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`${controlPrefix}.keywords`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Meta Keywords</FormLabel>
            <FormControl>
              <TagInput
                maxTags={5}
                setTags={field.onChange}
                tags={(field.value as Tag[]) ?? []}
                activeTagIndex={activeTagIndex}
                setActiveTagIndex={setActiveTagIndex}
                showCount={true}
                styleClasses={{
                  inlineTagsContainer: "bg-input font-arabic-body",
                  tag: { body: "font-arabic-body" },
                  input: "font-arabic-body",
                }}
                placeholder={`Enter a meta Keywords`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`${controlPrefix}.description`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Meta Description</FormLabel>
            <FormControl>
              <Textarea
                rows={4}
                {...field}
                value={field.value ?? ""}
                placeholder={`Enter a Meta Description`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`${controlPrefix}.media`}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Meta Media</FormLabel>
            <FormControl>
              <ImageUpload
                bucketName="Adviser"
                folderPath="tour_images"
                maxSizeMB={5}
                showExistingFiles={true}
                value={field.value?.url}
                onChange={(url) => field.onChange({ ...field.value, url })}
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
  );
}
