export const revalidate = 0;
import React, { Suspense } from "react";
import { BaseSettingForm } from "./components/base-setting-form";
import { getSettingBySectionAsync } from "@/server/settings.server";
import { TabsContent } from "@/components/ui/tabs";
import { seoMenuItems } from "./components/lib";
import { SeoForm } from "@/components/seo-form";
import { unstable_cache } from "next/cache";
import { FormLoading } from "@/components/form-loading";

const getSettingBySectionAsyncCached = unstable_cache(
  async () => getSettingBySectionAsync("CMS"),

  ["getSettingBySectionAsync"],
  { revalidate: 86400 }
);

export default async function Page() {
  return (
    <Suspense fallback={<FormLoading />}>
      {Object.entries(seoMenuItems).map(([key, o]) => (
        <TabsContent value={key} key={key}>
          <BaseSettingForm
            dataPromise={getSettingBySectionAsyncCached()}
            schemaKey={o.schemaKey}
          >
            <SeoForm
              title={o.title}
              description={o.description}
              prefiex={o.schemaKey}
            />
          </BaseSettingForm>
        </TabsContent>
      ))}
    </Suspense>
  );
}
