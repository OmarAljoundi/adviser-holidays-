"use client";
import { useInitTransition } from "@/hooks/use-global-transition";

export function InitGlobalTransitionProvider() {
  useInitTransition();
  return null;
}
