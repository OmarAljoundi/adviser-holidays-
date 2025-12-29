"use server";

import { revalidatePath, unstable_noStore as noStore } from "next/cache";



export async function revalidateTour(slug: string) {
  noStore();
  const encodeSlug = encodeURIComponent(slug);
  revalidatePath(`/tour/${encodeSlug}`);
  revalidatePath("/(protected)", "layout");
  revalidatePath(`/(public)/(inner)/tour-listing/[destination]`, "page");
}

export async function revalidateStaticPages() {
  noStore();
  revalidatePath(`/(public)/(inner)/tour-listing`, "page");
  revalidatePath(`/(public)/(inner)/about-us`, "page");
  revalidatePath(`/(public)`, "page");
  revalidatePath(`/(public)`, "layout");
  revalidatePath("/(protected)", "layout");
}

export async function revalidateDestination(slug: string) {
  noStore();
  const encodeSlug = encodeURIComponent(slug);
  revalidatePath(`/tour-listing/${encodeSlug}`);
  revalidatePath("/(protected)", "layout");
  await revalidateStaticPages();

}

