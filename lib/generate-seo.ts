import { SeoSchema } from "@/schema/seo-schema";
import { Metadata } from "next";

export const generatePageSeo = (
  seo: SeoSchema,
  pathname: string = "/",
  images?: Array<{ url: string; width?: number; height?: number; alt?: string }>
): Metadata => {
  const { keywords, description, title, media } = seo;

  let ogImages =
    images?.map((img) => {
      return {
        url: img.url,
        width: img.width ?? 1200,
        height: img.height ?? 630,
        alt: img?.alt ?? "Adviserholidays preview image",
      };
    }) || [];

  const seoImages = media
    ? [
        {
          url: media.url,
          width: 1200,
          height: 630,
          alt: media?.alt ?? "Adviserholidays preview image",
        },
      ]
    : [];

  ogImages = [...ogImages, ...seoImages];
  const url = `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`;

  return {
    title: title ?? "",
    description: description ?? "",
    keywords: keywords?.map((x) => x.text) ?? [],
    alternates: {
      canonical: url,
    },
    category: "Travel",
    openGraph: {
      title: title ?? "",
      description: description ?? "",
      url,
      siteName: "Adviserholidays",
      images: ogImages,
      locale: "ar_JO",
      type: "website",
      countryName: "Jordan",
    },
    twitter: {
      card: "summary_large_image",
      description: description ?? "",
      images: ogImages,
      title: title ?? "",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
};
