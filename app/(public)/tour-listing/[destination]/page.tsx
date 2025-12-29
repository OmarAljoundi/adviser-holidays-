import Filter from "@/components/filter/filter";
import {
  getDestinations,
  getToursByAttributes,
} from "@/server/public-query.server";
import React, { Suspense } from "react";
import DestinationBreadcrumb from "./destination-bread-crumb";
import { FilterLoading } from "@/components/shared/filter-loading";
import { CardsLoading } from "@/components/shared/cards-loading";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/components/shared/tour-lising-search-params";
import { RenderToursFromDest } from "@/components/shared/render-tours-server";
import { AttributeTabsLoading } from "../attribute-tabs-loading";
import { hashString } from "@/lib/utils";
import { AttributeTabs } from "../attribute-tabs";
import { unstable_cache } from "next/cache";
import { getAttributesBySlug } from "@/server/public-query.server";
import { Metadata } from "next";
import { seoSchema } from "@/schema/seo-schema";
import { generatePageSeo } from "@/lib/generate-seo";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ destination: string }>;
  searchParams: Promise<{ attribute?: string }>;
}): Promise<Metadata> {
  const { destination } = await params;
  const { attribute } = await searchParams;
  const slug = decodeURIComponent(destination);

  let url = `/tour-listing/${slug}`;

  if (attribute) url += `?attribute=${attribute}`;

  const getAttributesBySlugCached = unstable_cache(
    async () => getAttributesBySlug(slug),
    ["attributes", hashString(slug)],
    { revalidate: 86400, tags: ["attributes", hashString(slug)] }
  );

  const result = await getAttributesBySlugCached();
  const parsedSeo = seoSchema.parse(result?.seo ?? {});
  const dictionary = generatePageSeo(
    parsedSeo,
    url,
    result?.image ? [{ ...result?.image }] : []
  );
  return dictionary;
}

async function CardServer({
  attributeSlug,
  slug,
}: {
  slug: string;
  attributeSlug: string;
}) {
  
  const getToursByAttributesCached = unstable_cache(
    async () => getToursByAttributes(slug, attributeSlug, ),
    ["attributes-tours", hashString(slug), hashString(attributeSlug)],
    {
      revalidate: 86400,
      tags: ["attributes-tours", hashString(slug), hashString(attributeSlug)],
    }
  );

  const result = await getToursByAttributesCached()

  return <RenderToursFromDest result={result} />;
}

const DestinationPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ destination: string }>;
  searchParams: Promise<SearchParams>;
}) => {
  const { destination } = await params;
  const { attribute } = await loadSearchParams(searchParams);
  const slug = decodeURIComponent(destination);
  const attributeSlug = decodeURIComponent(attribute as string);

  const getAttributesBySlugCached = unstable_cache(
    async () => getAttributesBySlug(slug),
    ["attributes", hashString(slug)],
    { revalidate: 86400, tags: ["attributes", hashString(slug)] }
  );

  const getToursByAttributesCached = unstable_cache(
    async () => getToursByAttributes(slug, attributeSlug, ),
    ["attributes-tours", hashString(slug), hashString(attributeSlug)],
    {
      revalidate: 86400,
      tags: ["attributes-tours", hashString(slug), hashString(attributeSlug)],
    }
  );

  return (
    <React.Fragment>
      <DestinationBreadcrumb dataPromise={getToursByAttributesCached()} />

      {!attribute && (
        <Suspense
          fallback={
            <React.Fragment>
              <div className="mt-8">
                <FilterLoading />
              </div>
            </React.Fragment>
          }
        >
          <div className="mt-8">
            <Filter
              onChange={true}
              enableTabs={true}
              destinationPromise={getDestinations()}
            />
          </div>
        </Suspense>
      )}

      {attribute && (
        <Suspense
          fallback={<AttributeTabsLoading />}
          key={destination ? hashString(destination) : "all"}
        >
          <AttributeTabs
            slug={slug}
            dataPromise={getAttributesBySlugCached()}
            attribute={attribute}
          />
        </Suspense>
      )}
      <Suspense
        fallback={<CardsLoading />}
        key={attribute ? hashString(attribute) : "ALL"}
      >
        <CardServer attributeSlug={attributeSlug} slug={slug} />
      </Suspense>
    </React.Fragment>
  );
};

export default DestinationPage;
