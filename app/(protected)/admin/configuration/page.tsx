"use cache"
import  { Suspense } from "react";
import { HomeSettingsForm } from "./components/home-settings-form";
import { getSettingBySectionAsync } from "@/server/settings.server";
import { BaseSettingForm } from "./components/base-setting-form";
import { FormLoading } from "@/components/form-loading";


export default async function Page() {
  return (
    <Suspense fallback={<FormLoading />}>
      <BaseSettingForm
        dataPromise={getSettingBySectionAsync("CMS")}
        schemaKey="home"
      >
        <HomeSettingsForm />
      </BaseSettingForm>
    </Suspense>
  );
}
