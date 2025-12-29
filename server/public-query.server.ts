"use server";
import { db } from "@/db.server";
import {
  queryLocationSchema,
  QueryTourSchema,
  queryTourSchema,
  queryTourTypeSchema,
} from "@/schema";
import { settingSchema } from "@/schema/setting-schema";
import { auth } from "@/auth";
import { NextRequest } from "next/server";

export async function getSession(request: NextRequest) {
  return await auth.api.getSession({
    query: {
      disableCookieCache: false,
    },
    headers: request.headers,
  });
}

export async function getBestTours() {
  const settings = await db.setting.findFirst({
    where: { section: "CMS" },
  });

  if (!settings) return [];

  const settingsParsed = settingSchema.parse(settings.value);
  const tours = await db.tour.findMany({
    where: {
      id: { in: settingsParsed.home.bestTours.map((o) => o.id) },
      isActive: true,
      OR: [{ priceSingleJo: { gt: 0 } }, { priceDoubleJo: { gt: 0 } }],
    },
    include: {
      tourType: true,
    },
  });

  if (tours) return tours.map((o) => queryTourSchema.parse(o));

  return [];
}

export async function getDestinations() {
  const destinations = await db.location.findMany({
    where: {
      isActive: true,
    },
    include: {
      attributes: {
        select: {
          id: true,
          _count: true,
          order: true,
          title: true,
        },
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return destinations.map((o) => queryLocationSchema.parse(o));
}

export async function getTourTypes() {
  const tourTypes = await db.tourType.findMany({
    orderBy: { order: "asc" },
  });
  return tourTypes.map((o) => queryTourTypeSchema.parse(o));
}

export async function getAttributesBySlug(slug: string) {
  const destination = await db.location.findFirst({
    where: {
      isActive: true,
      slug,
    },
    include: {
      attributes: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (destination) {
    return queryLocationSchema.parse(destination);
  }

  return undefined;
}

export async function getToursByAttributes(
  slug: string,
  attributeSlug?: string
) {
  const destination = await db.location.findFirst({
    orderBy: { order: "asc" },
    where: {
      slug,
      isActive: true,
    },
    include: {
      attributes: {
        include: {
          locationTours: {
            where: {
              tour: {
                isActive: true,
                OR: [{ priceSingleJo: { gt: 0 } }, { priceDoubleJo: { gt: 0 } }],
              },
            },

            orderBy: {
              tour: { priceDoubleJo: "asc" },
            },
            include: {
              locationAttr: true,
              location: true,
              tour: {
                select: {
                  name: true,
                  numberOfDays: true,
                  code: true,
                  images: true,
                  id: true,
                  isActive: true,
                  priceSingleJo:true,
                  priceDoubleJo:true,
                  slug: true,
                  startDay: true,
                  tourCountries: true,
                  tourType: {
                    select: {
                      id: true,
                      name: true,
                      image: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!destination || destination.attributes.length == 0)
    return {
      tours: [] as QueryTourSchema[],
      destinationName: destination?.name,
    };

  if (destination.attributes.length == 1) {
    const tours = destination.attributes[0].locationTours.map((o) =>
      queryTourSchema.parse(o.tour)
    );

    return { tours: tours, destinationName: destination?.name };
  }

  if (!attributeSlug) {
    throw new Error("Attribute slug must be provided");
  }

  const tours =
    destination.attributes
      .find((x) => x.title == attributeSlug.replaceAll("-", " "))
      ?.locationTours.map((o) => queryTourSchema.parse(o.tour)) ?? [];

  return { tours: tours, destinationName: destination?.name };
}

export async function getTours() {
  const tours = await db.tour.findMany({
    where: {
      isActive: true,
      OR: [{ priceSingleJo: { gt: 0 } }, { priceDoubleJo: { gt: 0 } }],
    },
    select: {
      name: true,
      numberOfDays: true,
      code: true,
      images: true,
      id: true,
      isActive: true,
      priceDoubleJo:true,
      priceSingleJo:true,
      slug: true,
      startDay: true,
      tourCountries: true,
      tourType: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  if (tours) return tours.map((o) => queryTourSchema.parse(o));

  return [];
}

export async function getTourDetails(slug: string) {
  const tour = await db.tour.findFirst({
    where: {
      isActive: true,
      slug,
      OR: [{ priceSingleJo: { gt: 0 } }, { priceDoubleJo: { gt: 0 } }],
    },
    include: {
      tourType: true,
    },
  });

  if (tour) return queryTourSchema.parse(tour);

  return undefined;
}
