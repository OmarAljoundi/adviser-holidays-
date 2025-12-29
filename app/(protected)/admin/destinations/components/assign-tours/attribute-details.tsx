import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./lib";
import { TourSelector } from "./tour-selector";
import { EmptyState } from "@/components/empty-state";
import { TbAssembly } from "react-icons/tb";

interface AttributeDetailsProps {
  fields: any[];
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
  handleAddAttribute: () => void;
}

export function AttributeDetails({
  fields,
  activeTab,
  setActiveTab,
  handleAddAttribute,
}: AttributeDetailsProps) {
  const form = useFormContext<FormValues>();

  if (!activeTab) {
    return (
      <EmptyState
        title="No tab is selected"
        description="You need to select a tab from the left side to show its details"
        icons={[TbAssembly]}
        className="flex flex-col items-center justify-center justify-items-center h-full"
      />
    );
  }

  return (
    <div className="w-2/3 flex flex-col overflow-hidden">
      {fields.length > 0 ? (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsContent
            key={`tab-content-${activeTab}`}
            value={activeTab}
            className="flex-1 mt-0 data-[state=active]:flex flex-col px-2"
            forceMount={true}
            hidden={false}
          >
            <FormField
              control={form.control}
              name={`attributes.${Number(activeTab)}.title`}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <TourSelector activeTab={activeTab} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <p>No attributes yet.</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={handleAddAttribute}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add an attribute
          </Button>
        </div>
      )}
    </div>
  );
}
