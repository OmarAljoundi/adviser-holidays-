export const revalidate = 0;
import React, { Suspense } from "react";
import { HomeSettingsForm } from "./components/home-settings-form";
import { getSettingBySectionAsync } from "@/server/settings.server";
import { BaseSettingForm } from "./components/base-setting-form";
import { FormLoading } from "@/components/form-loading";
import { unstable_cache } from "next/cache";

const getSettingBySectionAsyncCached = unstable_cache(
  async () => getSettingBySectionAsync("CMS"),

  ["getSettingBySectionAsync"],
  { revalidate: 86400 }
);

export default async function Page() {
  return (
    <Suspense fallback={<FormLoading />}>
      <BaseSettingForm
        dataPromise={getSettingBySectionAsyncCached()}
        schemaKey="home"
      >
        <HomeSettingsForm />
      </BaseSettingForm>
    </Suspense>
  );
}
