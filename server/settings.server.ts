"use server";

import { db } from "@/db.server";
import { Setting } from "@/generated/prisma/client";
import { SettingSchema } from "@/schema/setting-schema";
import { revalidateDestination } from "./revalidation.server";

export async function getSettingBySectionAsync(section: "CMS") {
  const record = await db.setting.findFirst({
    where: {
      section,
    },
  });
  return record?.value as SettingSchema;
}

export async function addUpdateSettingAsync(
  section: "CMS" | "Gallery",
  value: Setting["value"],
  mode: "add" | "update"
): Promise<{ section: string | null; success: boolean }> {
  try {
    if (mode === "update") {
      await db.setting.update({
        where: {
          section,
        },
        data: {
          value: value as any,
        },
      });
    } else {
      await db.setting.create({
        data: {
          value: value as any,
          section,
        },
      });
    }

    await revalidateDestination();

    return { section, success: true };
  } catch (ex) {
    console.log("Error", ex);
    return { section: null, success: false };
  }
}
