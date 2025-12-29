"use server";

import { db } from "@/db.server";
import { revalidateStaticPages } from "./revalidation.server";
import { unstable_noStore } from "next/cache";
import { Prisma } from "@/generated/prisma/client";

/**
 * Query multiple locations with strong typing for filter, pagination, and relations
 */
export async function locationQuery<T extends Prisma.LocationFindManyArgs>(
  args: Prisma.SelectSubset<T, Prisma.LocationFindManyArgs>
): Promise<Array<Prisma.LocationGetPayload<T>>> {
  return db.location.findMany(args);
}

/**
 * Update a location with strong typing for data, filter, and included relations
 */
export async function locationUpdate<T extends Prisma.LocationUpdateArgs>(
  args: Prisma.SelectSubset<T, Prisma.LocationUpdateArgs>
): Promise<Prisma.LocationGetPayload<T>> {
  unstable_noStore();

  const result = await db.location.update(args);
  return result;
}

/**
 * Update multiple locations with strong typing for data, filter, and included relations
 */
export async function locationUpdateMany<
  T extends Prisma.LocationUpdateManyArgs
>(
  args: Prisma.SelectSubset<T, Prisma.LocationUpdateManyArgs>
): Promise<Prisma.BatchPayload> {
  unstable_noStore();
  const result = await db.location.updateMany(args);
  return result;
}

/**
 * Delete a location with strong typing for filter and included relations
 */
export async function locationDelete<T extends Prisma.LocationDeleteArgs>(
  args: Prisma.SelectSubset<T, Prisma.LocationDeleteArgs>
): Promise<Prisma.LocationGetPayload<T>> {
  unstable_noStore();
  const result = await db.location.delete(args);
  return result;
}

/**
 * Query a single location with strong typing for filter and included relations
 */
export async function locationSingleQuery<
  T extends Prisma.LocationFindUniqueArgs
>(
  args: Prisma.SelectSubset<T, Prisma.LocationFindUniqueArgs>
): Promise<Prisma.LocationGetPayload<T> | null> {
  return db.location.findFirst(args);
}

/**
 * Create a location with strong typing for data and included relations
 */
export async function locationCreate<T extends Prisma.LocationCreateArgs>(
  args: Prisma.SelectSubset<T, Prisma.LocationCreateArgs>
): Promise<Prisma.LocationGetPayload<T>> {
  unstable_noStore();
  const result = await db.location.create(args);
  return result;
}

export async function locationUpdateOrders(
  newOrder: { id: number; order: number }[]
): Promise<void> {
  unstable_noStore();
  try {
    const currentLocations = await db.location.findMany({
      select: { id: true, order: true },
    });

    const currentOrderMap = Object.fromEntries(
      currentLocations.map((loc) => [loc.id, loc.order])
    );

    const changedLocations = newOrder.filter(
      (loc) => currentOrderMap[loc.id] !== loc.order
    );

    if (changedLocations.length === 0) {
      console.log("No location orders changed, skipping update");
      return;
    }

    await db.$transaction(async (tx) => {
      for (const location of changedLocations) {
        await tx.location.updateMany({
          where: { id: location.id },
          data: { order: location.order },
        });
      }
    });

    await revalidateStaticPages();
    console.log(
      `Location order updated successfully (${changedLocations.length} locations changed)`
    );
  } catch (error) {
    console.error("Error updating location order:", error);
    throw error;
  }
}
