"use server";
import { CONFIG_PATH, SETTING_PATH } from "@/lib/keys";
import { supabaseClient } from "@/lib/supabaseClient";
import {
  QueryLocationSchema,
  QueryOfficeSchema,
  QueryTourSchema,
} from "@/schema";
import { Setting } from "@/types/custom";

export async function getSiteData(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  const result = await fetch(
    `${process.env.BACKEND_API}/offices/${subdomain}`,
    { next: { revalidate: 86400 } }
  );

  if (result.status == 200) {
    return (await result.json()) as {
      result: {
        bestTours: QueryTourSchema[];
        details: QueryOfficeSchema;
        faq: { id: string; title: string; description: string }[];
        pricingFilter: {
          arCurrency: string;
          minPrice: number;
          maxPrice: number;
        };
      };
    };
  }

  return undefined;
}

export async function getDestinations() {
  const result = await fetch(`${process.env.BACKEND_API}/destinations`, {
    next: { revalidate: 86400 },
  });

  if (result.status == 200) {
    return (await result.json()) as {
      result: Array<QueryLocationSchema>;
    };
  }
  return undefined;
}

export async function getDestination(slug: string, currency: string) {
  const result = await fetch(
    `${process.env.BACKEND_API}/destinations/${slug}?currency=${currency}`,
    { next: { revalidate: 86400 } }
  );

  if (result.status == 200) {
    return (await result.json()) as {
      result: { tours: Array<QueryTourSchema>; destinationName: string };
    };
  }
  return undefined;
}

export async function getTours(currency: string) {
  const result = await fetch(
    `${process.env.BACKEND_API}/tours?currency=${currency}`,
    {
      next: { revalidate: 86400 },
    }
  );

  if (result.status == 200) {
    return (await result.json()) as {
      result: Array<QueryTourSchema>;
    };
  }
  return undefined;
}

export async function getTourDetails(slug: string, currency: string) {
  const result = await fetch(
    `${process.env.BACKEND_API}/tours/${slug}?currency=${currency}`,
    {
      next: { revalidate: 86400 },
    }
  );

  if (result.status == 200) {
    return (await result.json()) as {
      result: QueryTourSchema;
    };
  }
  return undefined;
}

export const getContentData = async () => {
  const { data } = await supabaseClient.storage
    .from("Adviser")
    .list(SETTING_PATH);

  let responseData: Setting | undefined;

  if (data && data.length > 0 && data.find((x) => x.name === CONFIG_PATH)) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_IMAGE_URL}/${SETTING_PATH}/${CONFIG_PATH}`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    responseData = (await response.json()) as Setting;

    return responseData;
  }
};
