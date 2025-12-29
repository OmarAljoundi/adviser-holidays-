"use server";

import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function revalidateDestination() {
  noStore();
  revalidatePath(`/(public)`, "layout");
  revalidatePath("/(protected)", "layout");
}
