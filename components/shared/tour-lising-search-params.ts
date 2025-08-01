import { createLoader, parseAsString, parseAsInteger } from "nuqs/server";

export const tourListingSearchParams = {
  country: parseAsString,
  days: parseAsString,
  maxprice: parseAsInteger,
};

export const loadSearchParams = createLoader(tourListingSearchParams);
