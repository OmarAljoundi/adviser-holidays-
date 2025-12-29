import React from "react";
import { Input, InputProps } from "./input";
import { cn } from "@/lib/utils";

const SlugInput = React.forwardRef<
  HTMLInputElement,
  InputProps & { firstText: string }
>(({ className, firstText, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <div className="flex rounded-lg shadow-sm shadow-black/5">
        <span className="inline-flex items-center rounded-s-lg border border-input bg-background pe-6 ps-3 text-sm text-muted-foreground w-44 line-clamp-1">
          {firstText}
        </span>
        <Input
          className={cn("-ms-px rounded-s-none shadow-none", className)}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
});
SlugInput.displayName = "SlugInput";

export { SlugInput };
