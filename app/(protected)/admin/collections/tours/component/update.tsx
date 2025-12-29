"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { updateTourSchema, UpdateTourSchema } from "@/schema";
import { tourUpdate } from "@/server/tours.server";
import { TourForm } from "./form";
import { revalidateDestination } from "@/server/revalidation.server";

export function UpdateTour({ tour }: { tour: UpdateTourSchema }) {
  const { id } = useParams();

  const form = useForm({
    resolver: zodResolver(updateTourSchema),
    defaultValues: tour,
  });

  const route = useRouter();

  async function onSubmit(body: UpdateTourSchema) {
    const result = await tourUpdate({
      data: { ...body },
      where: { id: Number(id) },
    });
    if (result.id) {
      await revalidateDestination()
      toast.success("Tour update successfully");
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
