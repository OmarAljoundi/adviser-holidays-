import { REVALIDATE_LOCATION_LIST } from '@/lib/keys'
import { getDestination } from '@/lib/operations'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export function useDestination() {
  return useQuery({
    queryKey: [REVALIDATE_LOCATION_LIST],
    queryFn: async () => await getDestination(),
    refetchInterval: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  })
}
