import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { QueryTourSchema } from "@/schema";
import { Files, FileText, Link, Plus, TrashIcon } from "lucide-react";
import React, { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function Hotels() {
  const { control } = useFormContext<QueryTourSchema>();

  const { append, remove, fields } = useFieldArray({
    control,
    name: "tourHotels",
  });

  const appendNewEmpty = useCallback(() => {
    append("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tour Hotels</CardTitle>
        <CardDescription>
          If the tour has specific hotels, please specify them here
        </CardDescription>
      </CardHeader>
      <Separator className="my-2" />

      <CardContent className="pt-2">
        {fields.length == 0 ? (
          <EmptyState
            title="No menus created"
            description="You can create new menu items to show it in your site header"
            className="max-w-full"
            icons={[FileText, Link, Files]}
            action={{
              label: "Create Menu",
              onClick: () => appendNewEmpty(),
            }}
          />
        ) : (
          <div className="gap-x-2 rounded-lg">
            <div className="flex w-full flex-col gap-2">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="mt-4 grid grid-cols-[9fr,auto,auto,auto] items-end gap-2"
                >
                  <FormField
                    control={control}
                    name={`tourHotels.${index}`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          {index == 0 ? "Hotel name" : undefined}
                        </FormLabel>
                        <FormControl ltr>
                          <Input
                            {...field}
                            placeholder="Please fill the hotel name"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-9 shrink-0"
                    onClick={() => appendNewEmpty()}
                  >
                    <Plus className="size-4 " aria-hidden="true" />
                    <span className="sr-only">Remove</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-9 shrink-0"
                    onClick={() => remove(index)}
                  >
                    <TrashIcon
                      className="size-4 text-destructive"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
