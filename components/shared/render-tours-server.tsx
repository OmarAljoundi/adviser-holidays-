"use client";
import { getDestination, getTours } from "@/server/public-query.server";
import React, { use } from "react";
import RenderTours from "./render-tours";

export function RenderToursFromDest({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getDestination>;
}) {
  const result = use(dataPromise);
  return <RenderTours tours={result?.result?.tours ?? []} />;
}

export function RenderToursFromListing({
  dataPromise,
}: {
  dataPromise: ReturnType<typeof getTours>;
}) {
  const result = use(dataPromise);
  return <RenderTours tours={result?.result ?? []} />;
}
