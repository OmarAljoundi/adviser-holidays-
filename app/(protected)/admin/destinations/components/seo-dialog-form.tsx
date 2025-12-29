"use client";

import { SeoFormInputs } from "@/components/seo-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { locationUpdate } from "@/server/location.server";
import {
  createLocationSchema,
  queryLocationSchema,
  QueryLocationSchema,
} from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTransitionStore } from "@/hooks/use-global-transition";
import { revalidateDestination } from "@/server/revalidation.server";

export function SeoDialogForm({
  defaultValues,
  open,
  onOpenChange,
}: {
  defaultValues: QueryLocationSchema;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const form = useForm({
    resolver: zodResolver(queryLocationSchema.pick({ seo: true })),
    defaultValues: {
      seo: defaultValues.seo,
    },
  });

  const route = useTransitionStore();

  async function onSubmit(body: any) {
    const parsedBody = createLocationSchema.pick({ seo: true }).parse(body);
    await locationUpdate({
      data: { seo: parsedBody.seo },
      where: { id: defaultValues.id },
    });
    await revalidateDestination(defaultValues.slug!);

    toast.success("Destination SEO saved successfully");
    onOpenChange(false);
    route.refresh();
  }

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={(e) => onOpenChange(e)}>
        <DialogContent className="flex flex-col gap-0 overflow-y-visible  sm:max-w-lg [&>button:last-child]:top-3.5">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="contents space-y-0 text-left">
              <DialogTitle className=" text-base font-arabic-header">
                {defaultValues.name}
              </DialogTitle>
              <DialogDescription>
                Adjust the seo for destination
              </DialogDescription>
            </DialogHeader>
            <Separator className="my-4" />

            <SeoFormInputs />

            <DialogFooter className=" border-border px-2 py-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button isLoading={form.formState.isSubmitting} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
