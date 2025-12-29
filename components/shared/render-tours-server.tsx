"use client";
import { getToursByAttributes, getTours } from "@/server/public-query.server";
import  { use } from "react";
import RenderTours from "./render-tours";

export function RenderToursFromDest({
  result,
}: {
  result: Awaited<ReturnType<typeof getToursByAttributes>>;
}) {
  return <RenderTours tours={result?.tours ?? []} />;
}

export function RenderToursFromListing({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getTours>;
}) {
  const result = use(dataPromise);
  return <RenderTours tours={result ?? []} />;
}
