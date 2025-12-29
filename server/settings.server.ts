"use server";

import { db } from "@/db.server";
import { Setting } from "@/generated/prisma/client";
import { SettingSchema } from "@/schema/setting-schema";
import { unstable_noStore } from "next/cache";

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
  unstable_noStore();
  try {
    if (mode == "update") {
      await db.setting.update({
        where: {
          section,
        },
        data: {
          value: value as any,
        },
      });

      return { section, success: true };
    }

    await db.setting.create({
      data: {
        value: value as any,
        section,
      },
    });

    return { section, success: true };
  } catch (ex) {
    console.log("Error", ex);
    return { section: null, success: false };
  }
}
