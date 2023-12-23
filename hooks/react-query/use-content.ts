import { CONFIG_PATH, REVALIDATE_LOCATION_LIST, REVALIDATE_TOUR_LIST, SETTING_PATH } from '@/lib/keys'
import { getContentData, getDestination } from '@/lib/operations'
import { supabaseClient } from '@/lib/supabaseClient'
import { Setting } from '@/types/custom'
import { useQuery } from '@tanstack/react-query'

export function useContent() {
  return useQuery({
    queryFn: async () => await getContentData(),
    queryKey: [SETTING_PATH],
    enabled: true,
  })
}
