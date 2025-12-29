"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DeleteAlert } from "./delete-alert";
import { UseMutationOptions } from "@tanstack/react-query";

type RedirectActionProps = {
  type: "redirect";
  url: string;
};

type ClickActionProps = {
  type: "click";
  onClick: () => void;
};

type BaseActionProps = {
  icon: LucideIcon;
  label?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  disabled?: boolean;
  className?: string;
  showText?: boolean;
};

type ActionItemProps = BaseActionProps &
  (RedirectActionProps | ClickActionProps);

type DeleteActionProps = {
  itemName?: string;
  deleteFunction: () => Promise<unknown>;
  mutationOptions?: Omit<
    UseMutationOptions<unknown, Error, void, unknown>,
    "mutationFn"
  >;
  onSuccess?: () => void;
  confirmText?: string;
  disabled?: boolean;
  className?: string;
  showText?: boolean;
  title?: string;
  message?: string;
};

type EditActionItemProps = {
  url: string;
  disabled?: boolean;
  className?: string;
  showText?: boolean;
};

type ActionsRowProps = {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  gap?: "none" | "xs" | "sm" | "md" | "lg";
};

/*************** Components ***************/

/**
 * The main container for action buttons in a table row
 */
export function ActionsRow({
  children,
  className,
  align = "end",
  gap = "sm",
}: ActionsRowProps) {
  const gapMap = {
    none: "gap-0",
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
  };

  const alignMap = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  };

  return (
    <div
      className={cn(
        "flex items-center",
        alignMap[align],
        gapMap[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Generic action button for custom actions
 */
export function ActionItem({
  icon: Icon,
  label,
  variant = "ghost",
  disabled,
  className,
  showText = false,
  ...props
}: ActionItemProps) {
  if (props.type === "redirect") {
    return (
      <Link
        href={props.url}
        className={disabled ? "pointer-events-none opacity-50" : ""}
      >
        <Button
          variant={variant}
          size={showText ? "default" : "icon"}
          disabled={disabled}
          className={className}
        >
          <Icon className="h-4 w-4" />
          {showText && label && <span className="ml-2">{label}</span>}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      variant={variant}
      size={showText ? "default" : "icon"}
      onClick={props.onClick}
      disabled={disabled}
      className={className}
    >
      <Icon className="h-4 w-4" />
      {showText && label && <span className="ml-2">{label}</span>}
    </Button>
  );
}

/**
 * Pre-configured delete action with confirmation dialog with built-in mutation handling
 */
export function DeleteAction({
  itemName,
  deleteFunction,
  mutationOptions,
  onSuccess,
  confirmText = "Delete",
  disabled = false,
  className,
  showText = false,
  title,
  message,
}: DeleteActionProps) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Button
        variant="ghost"
        size={showText ? "default" : "icon"}
        onClick={() => setOpen(true)}
        disabled={disabled}
        className={cn(
          "text-destructive hover:text-destructive hover:bg-destructive/10",
          className
        )}
      >
        <Trash className="h-4 w-4" />
        {showText && <span className="ml-2">Delete</span>}
      </Button>

      <DeleteAlert
        open={open}
        onOpenChange={setOpen}
        itemName={itemName}
        deleteFunction={deleteFunction}
        mutationOptions={mutationOptions}
        onSuccess={onSuccess}
        confirmText={confirmText}
        title={title}
        message={message}
      />
    </React.Fragment>
  );
}

/**
 * Pre-configured edit action
 */
export function RedirectActionItem({
  url,
  disabled = false,
  className,
  showText = false,
}: EditActionItemProps) {
  return (
    <Link
      href={url}
      className={disabled ? "pointer-events-none opacity-50" : ""}
    >
      <Button
        variant="ghost"
        size={showText ? "default" : "icon"}
        className={className}
      >
        <Pencil className="h-4 w-4" />
        {showText && <span className="ml-2">Edit</span>}
      </Button>
    </Link>
  );
}
