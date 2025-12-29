"use server";

import { db } from "@/db.server";
import { Prisma } from "@/generated/prisma/client";
import { REVALIDATE_TOUR_TYPE } from "@/lib/keys";
import { revalidateTag, unstable_noStore } from "next/cache";

/**
 * Query multiple tour types with strong typing for filter, pagination, and relations
 */
export async function tourTypeQuery<T extends Prisma.TourTypeFindManyArgs>(
  args: Prisma.SelectSubset<T, Prisma.TourTypeFindManyArgs>
): Promise<Array<Prisma.TourTypeGetPayload<T>>> {
  return db.tourType.findMany(args);
}

/**
 * Update a tour types with strong typing for data, filter, and included relations
 */
export async function tourTypeUpdate<T extends Prisma.TourTypeUpdateArgs>(
  args: Prisma.SelectSubset<T, Prisma.TourTypeUpdateArgs>
): Promise<Prisma.TourTypeGetPayload<T>> {
  unstable_noStore();
  const result = await db.tourType.update(args);
  revalidateTag(`${REVALIDATE_TOUR_TYPE}:${args.data.id}`, "max");
  revalidateTag(`${REVALIDATE_TOUR_TYPE}`, "max");
  return result;
}

/**
 * Delete a tour type with strong typing for filter and included relations
 */
export async function tourTypeDelete<T extends Prisma.TourTypeDeleteArgs>(
  args: Prisma.SelectSubset<T, Prisma.TourTypeDeleteArgs>
): Promise<Prisma.TourTypeGetPayload<T>> {
  unstable_noStore();
  const result = await db.tourType.delete(args);

  revalidateTag(`${REVALIDATE_TOUR_TYPE}:${args.where.id}`, "max");
  revalidateTag(`${REVALIDATE_TOUR_TYPE}`, "max");
  return result;
}

/**
 * Query a single tour type with strong typing for filter and included relations
 */
export async function tourTypeSingleQuery<
  T extends Prisma.TourTypeFindUniqueArgs
>(
  args: Prisma.SelectSubset<T, Prisma.TourTypeFindUniqueArgs>
): Promise<Prisma.TourTypeGetPayload<T> | null> {
  return db.tourType.findUnique(args);
}

/**
 * Create a tour type with strong typing for data and included relations
 */
export async function tourTypeCreate<T extends Prisma.TourTypeCreateArgs>(
  args: Prisma.SelectSubset<T, Prisma.TourTypeCreateArgs>
): Promise<Prisma.TourTypeGetPayload<T>> {
  unstable_noStore();
  const result = await db.tourType.create(args);

  revalidateTag(`${REVALIDATE_TOUR_TYPE}`, "max");
  return result;
}

export async function tourTypeUpdateOrders(
  newOrder: { id: number; order: number }[]
): Promise<void> {
  unstable_noStore();
  try {
    const currenttourTypes = await db.tourType.findMany({
      select: { id: true, order: true },
    });

    const currentOrderMap = Object.fromEntries(
      currenttourTypes.map((tourT) => [tourT.id, tourT.order])
    );

    const changedtourTypes = newOrder.filter(
      (tourT) => currentOrderMap[tourT.id] !== tourT.order
    );

    if (changedtourTypes.length === 0) {
      console.log("No tourType orders changed, skipping update");
      return;
    }

    await db.$transaction(async (tx) => {
      for (const tourType of changedtourTypes) {
        await tx.tourType.updateMany({
          where: { id: tourType.id },
          data: { order: tourType.order },
        });
      }
    });

    console.log(
      `tourType order updated successfully (${changedtourTypes.length} tourTypes changed)`
    );
    changedtourTypes.forEach((element) => {
      revalidateTag(`${REVALIDATE_TOUR_TYPE}:${element.id}`, "max");
    });

      revalidateTag(`${REVALIDATE_TOUR_TYPE}`, "max");

    
  } catch (error) {
    console.error("Error updating tourType order:", error);
    throw error;
  }
}
