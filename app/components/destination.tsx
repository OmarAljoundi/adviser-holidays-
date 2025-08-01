import { FunctionComponent } from 'react'
import DestinationListing from './destination-listing'
import { HydrationBoundary, QueryClient, dehydrate,  } from '@tanstack/react-query'
import { REVALIDATE_LOCATION_LIST } from '@/lib/keys'
import { getDestinations } from '@/server/public-query.server'

interface DestinationProps {}

const Destination: FunctionComponent<DestinationProps> = async () => {
  const query = new QueryClient()
  await query.prefetchQuery({
    queryKey: [REVALIDATE_LOCATION_LIST],
    queryFn: getDestinations,
  })
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <DestinationListing />
    </HydrationBoundary>
  )
}

export default Destination
