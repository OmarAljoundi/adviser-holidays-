import { createLoader, parseAsString, parseAsInteger } from "nuqs/server";

export const tourListingSearchParams = {
  country: parseAsString,
  days: parseAsString,
  maxprice: parseAsInteger,
  attribute:parseAsString
};

export const loadSearchParams = createLoader(tourListingSearchParams);
