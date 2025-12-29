import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { cn } from "@/lib/utils";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { FieldArrayWithId, useFormContext } from "react-hook-form";
import { FormValues } from "./lib";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AttributesListProps {
  fields: FieldArrayWithId<FormValues, "attributes", "customId">[];
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
  handleAttributeMove: (data: {
    activeIndex: number;
    overIndex: number;
  }) => void;
  handleAddAttribute: () => void;
  handleRemoveAttribute: (index: number, id: number) => void;
}

export function AttributesList({
  fields,
  activeTab,
  setActiveTab,
  handleAttributeMove,
  handleAddAttribute,
  handleRemoveAttribute,
}: AttributesListProps) {
  const form = useFormContext<FormValues>();
  return (
    <div className="w-1/3 flex flex-col border-r  h-full">
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h3 className="text-sm font-medium">Attributes</h3>
        <div className="pr-4">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleAddAttribute}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      <ScrollArea className="overflow-y-auto flex-1 pe-4">
        <Sortable
          value={fields}
          uniqueId="id"
          onMove={handleAttributeMove}
          orientation="vertical"
        >
          {fields.map((field, index) => (
            <SortableItem
              key={field.customId}
              value={field.customId}
              className="mb-2"
              onClick={() => setActiveTab(String(index))}
            >
              <Card
                className={cn(
                  "flex items-center p-2 hover:bg-muted/50 transition-colors",
                  activeTab === String(index) ? "border-primary" : ""
                )}
              >
                <SortableDragHandle className="p-0 h-8 w-8" variant="ghost">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </SortableDragHandle>

                <div className="flex-1 px-2 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap font-arabic-header">
                  {form.watch(`attributes.${index}.title`) ||
                    `Attribute ${index + 1}`}
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveAttribute(index, field.id ?? 0);
                  }}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </Card>
            </SortableItem>
          ))}
        </Sortable>
      </ScrollArea>
    </div>
  );
}
