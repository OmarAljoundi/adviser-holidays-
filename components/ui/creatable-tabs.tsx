"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Sortable, SortableItem } from "@/components/ui/sortable";
import { Button, buttonVariants } from "@/components/ui/button";
import { Edit, File, Image, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EmptyState } from "../empty-state";

const MotionButton = motion(Button);
interface CreatableTabsProps<TData>
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Sortable<TData>>,
    "children"
  > {
  onAddNewTab: () => void;
  onTabRemove: (index: number) => void;
  maxNumberOfTabs?: number;
  buttonTitle: (index: number) => string;
  children: (activeTab: number) => React.ReactNode;
}

export function CreatableTabs<TData>({
  onAddNewTab,
  onTabRemove,
  buttonTitle,
  maxNumberOfTabs = Number.MAX_SAFE_INTEGER,
  ...rest
}: CreatableTabsProps<TData>) {
  const [activeTab, setActiveTab] = useState(0);
  const [, setOrderedTabs] = useState(rest?.value || []);

  const appendNewTab = useCallback(() => {
    onAddNewTab();
    setActiveTab(rest?.value.length);
  }, [onAddNewTab, rest?.value]);

  useEffect(() => {
    setOrderedTabs(rest.value || []);
  }, [rest.value]);

  return (
    <div className="mx-auto w-full">
      <div
        className={cn(
          rest.value?.length == 0
            ? "hidden"
            : "relative flex flex-wrap flex-row-reverse items-center gap-4 overflow-x-auto py-3"
        )}
      >
        <AnimatePresence mode="wait">
          <Sortable
            {...rest}
            uniqueId={rest.uniqueId}
            onDragEnd={(e) => {
              const index = rest?.value?.findIndex(
                (x: any) => x.id == e.over?.id
              );
              setActiveTab(index);
            }}
          >
            {rest?.value?.map((item: any, index) => (
              <SortableItem
                key={`${item.id}-${index}`}
                value={item.id}
                asTrigger={activeTab === index}
                className={cn(
                  `relative h-9  cursor-pointer font-arabic-header transition-all duration-300 hover:bg-secondary hover:text-secondary-foreground !opacity-100`,
                  activeTab === index
                    ? buttonVariants({ variant: "secondary" })
                    : buttonVariants({ variant: "outline" })
                )}
                onClick={() => setActiveTab(index)}
              >
                <React.Fragment>
                  <MotionButton
                    type="button"
                    className="z-50 px-0 size-6 rounded-full bg-destructive justify-center items-center text-destructive-foreground "
                    onClick={(e) => {
                      e.stopPropagation();
                      onTabRemove(index);
                      if (activeTab === index)
                        setActiveTab(Math.max(0, index - 1));
                    }}
                    disabled={activeTab === index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span>
                      <Trash2
                        className=" opacity-60 size-4"
                        aria-hidden="true"
                      />
                    </span>
                  </MotionButton>
                  <span className="w-40 truncate font-arabic-header" dir="rtl">
                    {buttonTitle(index)}
                  </span>
                </React.Fragment>
              </SortableItem>
            ))}
          </Sortable>
        </AnimatePresence>
        {rest?.value?.length > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={appendNewTab}
            disabled={rest.value?.length == maxNumberOfTabs}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      {rest?.value?.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mt-4 space-y-4"
          >
            {rest.children(activeTab)}
          </motion.div>
        </AnimatePresence>
      ) : (
        <EmptyState
          title="No items are found"
          description="It looks like you haven't created any items yet. Why not start by creating your first one?"
          action={{
            label: "Create new",
            onClick: () => onAddNewTab(),
          }}
          icons={[File, Edit, Image]}
          className="max-w-full"
        />
      )}
    </div>
  );
}
