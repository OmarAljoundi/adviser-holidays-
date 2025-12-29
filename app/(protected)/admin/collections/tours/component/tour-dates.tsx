import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { QueryTourSchema } from "@/schema";
import { Files, FileText, Link, Plus, TrashIcon } from "lucide-react";
import React, { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export function TourDates() {
  const { control } = useFormContext<QueryTourSchema>();

  const { append, remove, fields } = useFieldArray({
    control: control,
    name: "tourPrices",
  });

  const appendNewEmpty = useCallback(() => {
    append({
      uuid: crypto.randomUUID(),
      date: new Date(),
      include_all_month: false,
      one_price: true,
      price: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tour Dates</CardTitle>
        <CardDescription>
          if the tour has specific dates, please specify them here
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
                    name={`tourPrices.${index}.date`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <DatePicker
                            label={index == 0 ? "Date" : undefined}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-10 shrink-0"
                    onClick={() => appendNewEmpty()}
                  >
                    <Plus className="size-4 " aria-hidden="true" />
                    <span className="sr-only">Remove</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-10 shrink-0"
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
