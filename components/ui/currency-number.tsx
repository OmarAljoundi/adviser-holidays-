"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Button,
  Group,
  Input,
  Label,
  NumberField,
  NumberFieldProps,
} from "react-aria-components";

export function CurrencyNumber(
  props: NumberFieldProps &
    React.RefAttributes<HTMLDivElement> & { label?: string; desc?: string }
) {
  return (
    <NumberField {...props}>
      <div className="min-w-[300px] ">
        {props.label && (
          <Label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block text-sm font-medium rtl:text-right text-gray-700 dark:text-white">
            {props.label}
          </Label>
        )}
        <Group className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/5 transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-[3px] data-[focus-within]:ring-ring/20">
          <Input className="flex-1 bg-input px-3 py-2 tabular-nums text-foreground focus:outline-none" />
          <div className="flex h-[calc(100%+2px)] flex-col">
            <Button
              slot="increment"
              className="-me-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-input text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronUp size={12} strokeWidth={2} aria-hidden="true" />
            </Button>
            <Button
              slot="decrement"
              className="-me-px -mt-px flex h-1/2 w-6 flex-1 items-center justify-center border border-input bg-input text-sm text-muted-foreground/80 transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronDown size={12} strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>
        </Group>
      </div>
      {props.desc && (
        <p
          className="mt-2 text-xs text-muted-foreground"
          role="region"
          aria-live="polite"
        >
          {props.desc}
        </p>
      )}
    </NumberField>
  );
}
