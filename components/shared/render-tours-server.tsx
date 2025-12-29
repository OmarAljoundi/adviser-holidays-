"use client";
import { getToursByAttributes, getTours } from "@/server/public-query.server";
import RenderTours from "./render-tours";

export function RenderToursFromDest({
  result,
}: {
  result: Awaited<ReturnType<typeof getToursByAttributes>>;
}) {
  return <RenderTours tours={result?.tours ?? []} />;
}

