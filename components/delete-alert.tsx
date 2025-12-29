"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTransitionStore } from "@/hooks/use-global-transition";
import { toast } from "sonner";

export interface DeleteAlertProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  /**
   * The name or identifier of the item being deleted
   */
  itemName?: string;

  /**
   * Function to handle the delete action
   */
  deleteFunction: () => Promise<any>;

  /**
   * Optional mutation options
   */
  mutationOptions?: Omit<
    UseMutationOptions<any, Error, void, unknown>,
    "mutationFn"
  >;

  /**
   * Callback when deletion is successful
   */
  onSuccess?: () => void;

  /**
   * Custom title for the delete alert
   * @default "Delete Confirmation"
   */
  title?: string;

  /**
   * Custom message for the delete alert
   * @default "Are you sure you want to delete this item?"
   */
  message?: string;

  /**
   * Custom text for the confirm button
   * @default "Delete"
   */
  confirmText?: string;

  /**
   * Custom text for the cancel button
   * @default "Cancel"
   */
  cancelText?: string;
}

export function DeleteAlert({
  itemName,
  deleteFunction,
  mutationOptions,
  onSuccess,
  title = "Delete Confirmation",
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  ...rest
}: DeleteAlertProps) {
  const { refresh } = useTransitionStore();

  const mutation = useMutation({
    mutationFn: deleteFunction,
    ...mutationOptions,
    onSuccess: (...args) => {
      rest.onOpenChange?.(false);

      onSuccess?.();
      refresh();

      toast.success(`${itemName} has been deleted successfully`);
      mutationOptions?.onSuccess?.(...args);
    },
  });

  // Generate the default message if none is provided
  const defaultMessage = itemName
    ? `Are you sure you want to delete "${itemName}"?`
    : "Are you sure you want to delete this item?";

  const deleteMessage = message || defaultMessage;

  // Handle the delete action
  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <AlertDialog {...rest}>
      <AnimatePresence>
        {rest.open && (
          <AlertDialogContent forceMount>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AlertDialogHeader className="flex flex-col items-center justify-center space-y-2">
                {/* Icon Container */}
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center",
                    "bg-destructive/10 border-4 border-destructive/10"
                  )}
                >
                  <Trash className="w-6 h-6 text-destructive" />
                </div>

                <AlertDialogTitle className="text-center">
                  {title}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  {deleteMessage}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <motion.hr
                className="my-4 border-border"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />

              {mutation.isError && (
                <div className="mb-4 p-3 text-sm bg-destructive/10 text-destructive rounded border border-destructive/20">
                  {mutation.error?.message ||
                    "An error occurred while deleting."}
                </div>
              )}

              <AlertDialogFooter className="sm:justify-center flex-col sm:flex-row gap-2">
                {/* Cancel Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => rest.onOpenChange?.(false)}
                    disabled={mutation.isPending}
                    className="w-full"
                  >
                    {cancelText}
                  </Button>
                </motion.div>

                {/* Delete Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-full sm:w-auto"
                >
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    isLoading={mutation.isPending}
                    className="w-full"
                  >
                    {confirmText}
                  </Button>
                </motion.div>
              </AlertDialogFooter>
            </motion.div>
          </AlertDialogContent>
        )}
      </AnimatePresence>
    </AlertDialog>
  );
}
