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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { tourTypeCreate, tourTypeUpdate } from "@/server/tour-types.server";
import { tourTypeSchema, TourTypeSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTransitionStore } from "@/hooks/use-global-transition";

export function TourTypeForm({
  defaultValues,
  open,
  onOpenChange,
  newOrder = 1,
}: {
  defaultValues?: TourTypeSchema;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  newOrder?: number;
}) {
  const { refresh } = useTransitionStore();
  const form = useForm({
    resolver: zodResolver(tourTypeSchema),
    defaultValues: defaultValues ?? {
      name: "",
      showOnService: false,
    },
  });

  async function onSubmit(body: TourTypeSchema) {
    if (body.id) {
      await tourTypeUpdate({
        data: {
          name: body.name,
          showOnService: body.showOnService,
          image: body.image,
        },
        where: { id: body.id },
      });
    } else {
      await tourTypeCreate({
        data: {
          image: body.image,
          name: body.name,
          showOnService: body.showOnService,
          order: newOrder,
        },
      });
    }

    onOpenChange(false);
    form.reset({});

    refresh();
    toast.success("Tour type saved successfully");
  }

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={(e) => onOpenChange(e)}>
        <DialogContent className="flex flex-col gap-0 overflow-y-visible  sm:max-w-lg [&>button:last-child]:top-3.5">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="contents space-y-0 text-left">
              <DialogTitle className="border-b border-border  py-4 text-base">
                {defaultValues?.id ? "Edit tour type" : "Create tour type"}
              </DialogTitle>
            </DialogHeader>

            <div className="overflow-y-auto px-2">
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
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full mt-4">
                    <FormControl>
                      <Input
                        placeholder="Tour type name"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage className="h-auto mb-1" />
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
                        Show On europ tripes{" "}
                      </Label>
                      <p
                        id={`showOnService`}
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
