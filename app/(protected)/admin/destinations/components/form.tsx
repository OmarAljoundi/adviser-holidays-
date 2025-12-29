"use client";

import { ImageUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlugInput } from "@/components/ui/slug-input";
import { Switch } from "@/components/ui/switch";
import { locationCreate, locationUpdate } from "@/server/location.server";
import {
  createLocationSchema,
  queryLocationSchema,
  QueryLocationSchema,
  updateLocationSchema,
} from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  revalidateDestination,
} from "@/server/revalidation.server";
import { useTransitionStore } from "@/hooks/use-global-transition";

export function LocationForm({
  defaultValues,
  open,
  onOpenChange,
  newOrder = 1,
}: {
  defaultValues?: QueryLocationSchema;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  newOrder?: number;
}) {
  const form = useForm({
    resolver: zodResolver(queryLocationSchema),
    defaultValues: defaultValues ?? {
      id: 0,
    },
  });

  const route = useTransitionStore();

  async function onSubmit(body: QueryLocationSchema) {
    if (body.id) {
      const parsedBody = createLocationSchema.parse(body);
      await locationUpdate({
        data: { ...parsedBody },
        where: { id: body.id },
      });

      if (body.slug != parsedBody.slug) {
        await revalidateDestination();
      } else {
      }

    } else {
      const parsedBody = updateLocationSchema.parse(body);
      await locationCreate({
        data: { ...parsedBody, order: newOrder, isActive: true,  },
      });

    }

    toast.success("Destination saved successfully");
    onOpenChange(false);
    route.refresh();
  }

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={(e) => onOpenChange(e)}>
        <DialogContent className="flex flex-col gap-0 overflow-y-visible  sm:max-w-lg [&>button:last-child]:top-3.5">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="contents space-y-0 text-left">
              <DialogTitle className="border-b border-border  py-4 text-base">
                {defaultValues?.id ? "Edit destination" : "Create destination"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 px-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-full mt-4">
                    <FormControl>
                      <ImageUpload
                        bucketName="Adviser"
                        folderPath="tour_images"
                        maxSizeMB={5}
                        showExistingFiles={true}
                        value={field.value?.url as string}
                        onChange={(e) =>
                          field.onChange({ ...field.value, url: e })
                        }
                        altText={field.value?.alt as string}
                        onAltTextChange={(e) =>
                          field.onChange({ ...field.value, alt: e })
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full ">
                    <FormLabel>Destination Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Destination Name"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage className="h-auto" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className="w-full mt-4">
                    <FormLabel>Destination Slug</FormLabel>
                    <FormControl ltr>
                      <SlugInput
                        firstText="/tour-listing/"
                        placeholder="Enter a slug"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage className="h-auto" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="showOnService"
                render={({ field }) => (
                  <FormItem className="border-input has-data-[state=checked]:border-ring relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                    <FormControl ltr>
                      <Switch
                        id={"showOnService"}
                        className="order-1 after:absolute after:inset-0"
                        aria-describedby={`showOnService`}
                        onCheckedChange={field.onChange}
                        checked={field.value}
                      />
                    </FormControl>
                    <div className="grid grow gap-2">
                      <Label htmlFor={"showOnService"}>
                        Show On service tripes{" "}
                      </Label>
                      <p
                        id={`showOnService`}
                        className="text-muted-foreground text-xs"
                      >
                        Control if you want to show this type on the service
                        tripes
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="showOnEurope"
                render={({ field }) => (
                  <FormItem className="border-input has-data-[state=checked]:border-ring relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                    <FormControl ltr>
                      <Switch
                        id={"showOnEurope"}
                        className="order-1 after:absolute after:inset-0"
                        aria-describedby={`showOnEurope`}
                        onCheckedChange={field.onChange}
                        checked={field.value}
                      />
                    </FormControl>
                    <div className="grid grow gap-2">
                      <Label htmlFor={"showOnEurope"}>
                        Show On europ tripes{" "}
                      </Label>
                      <p
                        id={`showOnEurope`}
                        className="text-muted-foreground text-xs"
                      >
                        Control if you want to show this type on the europ
                        tripes
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
