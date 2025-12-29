"use client";
import React, { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { settingSchema, SettingSchema } from "@/schema/setting-schema";
import {
  addUpdateSettingAsync,
  getSettingBySectionAsync,
} from "@/server/settings.server";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { revalidateStaticPages } from "@/server/revalidation.server";

interface BaseSettingFormProps {
  children: ReactNode;
  dataPromise: ReturnType<typeof getSettingBySectionAsync>;
  schemaKey: keyof SettingSchema;
}

export function BaseSettingForm({
  children,
  dataPromise,
  schemaKey,
}: BaseSettingFormProps) {
  const defaultValues = React.use(dataPromise) as unknown as SettingSchema;
  const route = useRouter();

  const form = useForm({
    resolver: zodResolver(
      z.object({
        [schemaKey]: settingSchema.shape[schemaKey],
      })
    ),
    defaultValues: {
      ...defaultValues,
      home: {
        ...defaultValues?.home,
        bestTours: defaultValues?.home?.bestTours ?? [],
      },
    },
  });

  async function onSubmit(body: any) {
    const operation: "add" | "update" = defaultValues ? "update" : "add";

    const response = await addUpdateSettingAsync(
      "CMS",
      { ...defaultValues, ...(body as any) },
      operation
    );

    if (response.success) {
      await revalidateStaticPages();
      toast.success("Data saved successfully!");
      route.refresh();
      return;
    }
    toast.error("Error while saving the changes");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-end">
          <Button
            isLoading={form.formState.isSubmitting}
            leadingIcon={<Save />}
          >
            Save
          </Button>
        </div>
        {children}
      </form>
    </Form>
  );
}
