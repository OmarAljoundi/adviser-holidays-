import { REVALIDATE_TOUR_TYPE } from '@/lib/keys'
import { getTourTypes } from '@/lib/operations'
import { useQuery } from '@tanstack/react-query'

export function useTourTypes() {
  return useQuery({
    queryFn: async () => await getTourTypes(),
    queryKey: [REVALIDATE_TOUR_TYPE],
  })
}
