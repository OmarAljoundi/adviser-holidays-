"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createTourSchema, CreateTourSchema } from "@/schema";
import { tourCreate } from "@/server/tours.server";
import { TourForm } from "./form";
import { revalidateTour } from "@/server/revalidation.server";

export function CreateTour({ tour }: { tour?: CreateTourSchema }) {
  const form = useForm({
    resolver: zodResolver(createTourSchema),
    defaultValues: tour ?? {
      typeId: undefined,
      tourCountries: [],
      startDay: [],
      additionalService: [],
      tourExcludes: [],
      tourSections: [],
      tourHotels: [],
      tourIncludes: [],
    },
  });

  const route = useRouter();

  async function onSubmit(body: CreateTourSchema) {
    const result = await tourCreate({ data: { ...body } });
    if (result.id) {
      await revalidateTour(body.slug!);
      toast.success("Tour created successfully");
      route.replace(`/admin/collections/tours/${result.id}`);
      route.refresh();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TourForm />
      </form>
    </Form>
  );
}
