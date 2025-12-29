import React, { Suspense } from "react";
import { Metadata } from "next";
import { SearchParams } from "nuqs";
import {
  getDestinations,
  getToursByAttributes,
  getAttributesBySlug,
} from "@/server/public-query.server";
import Filter from "@/components/filter/filter";
import DestinationBreadcrumb from "./destination-bread-crumb";
import { FilterLoading } from "@/components/shared/filter-loading";
import { CardsLoading } from "@/components/shared/cards-loading";
import { loadSearchParams } from "@/components/shared/tour-lising-search-params";
import { RenderToursFromDest } from "@/components/shared/render-tours-server";
import { AttributeTabsLoading } from "../attribute-tabs-loading";
import { AttributeTabs } from "../attribute-tabs";
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

  const result = await getAttributesBySlug(slug);
  const parsedSeo = seoSchema.parse(result?.seo ?? {});
  return generatePageSeo(
    parsedSeo,
    url,
    result?.image ? [{ ...result?.image }] : []
  );
}

async function BreadcrumbContent({
  slug,
  attributeSlug,
}: {
  slug: string;
  attributeSlug: string;
}) {
  "use cache";
  return (
    <DestinationBreadcrumb
      dataPromise={getToursByAttributes(slug, attributeSlug)}
    />
  );
}

async function BreadcrumbLoader({
  params,
  searchParams,
}: {
  params: Promise<{ destination: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { destination } = await params;
  const { attribute } = await loadSearchParams(searchParams);
  
  const slug = decodeURIComponent(destination);
  const attributeSlug = decodeURIComponent(attribute as string);

  return <BreadcrumbContent slug={slug} attributeSlug={attributeSlug} />;
}


async function FilterContent() {
  "use cache";
  return (
    <div className="mt-8">
      <Filter
        onChange={true}
        enableTabs={true}
        destinationPromise={getDestinations()}
      />
    </div>
  );
}


async function AttributeTabsContent({
  slug,
  attribute,
}: {
  slug: string;
  attribute: string;
}) {
  "use cache";
  return (
    <AttributeTabs
      slug={slug}
      dataPromise={getAttributesBySlug(slug)}
      attribute={attribute}
    />
  );
}

async function AttributeTabsLoader({
  params,
  searchParams,
}: {
  params: Promise<{ destination: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { destination } = await params;
  const { attribute } = await loadSearchParams(searchParams);
  
  if (!attribute) return null;

  const slug = decodeURIComponent(destination);

  return <AttributeTabsContent slug={slug} attribute={attribute as string} />;
}


async function CardContent({
  slug,
  attributeSlug,
}: {
  slug: string;
  attributeSlug: string;
}) {
  "use cache";
  const result = await getToursByAttributes(slug, attributeSlug);
  return <RenderToursFromDest result={result} />;
}

async function CardLoader({
  params,
  searchParams,
}: {
  params: Promise<{ destination: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { destination } = await params;
  const { attribute } = await loadSearchParams(searchParams);

  const slug = decodeURIComponent(destination);
  const attributeSlug = decodeURIComponent(attribute as string);

  return <CardContent slug={slug} attributeSlug={attributeSlug} />;
}


const DestinationPage = ({
  params,
  searchParams,
}: {
  params: Promise<{ destination: string }>;
  searchParams: Promise<SearchParams>;
}) => {
  return (
    <>
      <Suspense fallback={null}>
        <BreadcrumbLoader params={params} searchParams={searchParams} />
      </Suspense>

      <Suspense
        fallback={
          <div className="mt-8">
            <FilterLoading />
          </div>
        }
      >
        <FilterContent />
      </Suspense>

      <Suspense fallback={<AttributeTabsLoading />}>
        <AttributeTabsLoader params={params} searchParams={searchParams} />
      </Suspense>

      <Suspense fallback={<CardsLoading />}>
        <CardLoader params={params} searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default DestinationPage;