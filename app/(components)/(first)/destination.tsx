import { FunctionComponent } from 'react'
import DestinationListingMobile from './destination-listing-mobile'
import DestinationListing from './destination-listing'
import { getDestination } from '@/lib/operations'
import { HydrationBoundary, QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { REVALIDATE_LOCATION_LIST } from '@/lib/keys'

interface DestinationProps {}

const Destination: FunctionComponent<DestinationProps> = async () => {
  const query = new QueryClient()
  await query.prefetchQuery({
    queryKey: [REVALIDATE_LOCATION_LIST],
    queryFn: getDestination,
  })
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <DestinationListing />
    </HydrationBoundary>
  )
}

export default Destination
