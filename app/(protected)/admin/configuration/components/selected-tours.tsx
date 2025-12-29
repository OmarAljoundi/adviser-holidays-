import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { queryTourSchema } from "@/schema";
import { Trash2 } from "lucide-react";
import { z } from "zod";

const partialQueryTour = queryTourSchema.partial();

interface SelectedToursProps {
  field: {
    value: z.infer<typeof partialQueryTour>[];
    onChange: (value: z.infer<typeof partialQueryTour>[]) => void;
  };
}

export function SelectedTours({ field }: SelectedToursProps) {
  if (field.value.length == 0) {
    return (
      <div className="border rounded-md p-2 flex flex-col h-[310px] bg-background">
        <div className="p-2 text-sm text-muted-foreground italic">
          No tours selected
        </div>
      </div>
    );
  }
  return (
    <div className="border rounded-md p-2 bg-background">
      <ScrollArea className="h-[295px] ">
        <div className="flex flex-wrap flex-col pe-3 gap-2 pb-1">
          {field.value.map((tour) => (
            <Badge
              key={tour.id}
              variant="outline"
              className="flex items-center gap-1 p-1 pl-2 pr-1 bg-input direction-rtl"
            >
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="mr-1 h-6 w-6 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  field.onChange(
                    field.value.filter((selected) => selected.id !== tour.id)
                  );
                }}
              >
                <Trash2 className="size-4 text-white" />
              </Button>
              <div className="flex flex-col items-end text-right flex-1">
                <span className="text-xs font-arabic-header">{tour.name}</span>
                {tour.tourType?.name && (
                  <span className="text-xs font-arabic-body text-muted-foreground">
                    {tour.tourType.name}
                  </span>
                )}
              </div>
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
