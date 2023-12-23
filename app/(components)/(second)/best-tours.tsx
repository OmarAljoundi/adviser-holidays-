import { REVALIDATE_TOUR_LIST } from '@/lib/keys'
import { getTours } from '@/lib/operations'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { FunctionComponent } from 'react'
import BestToursList from './best-tours-list'

interface BestToursProps {}

const BestTours: FunctionComponent<BestToursProps> = async () => {
  const query = new QueryClient()
  await query.prefetchQuery({
    queryKey: [REVALIDATE_TOUR_LIST],
    queryFn: getTours,
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <BestToursList />
    </HydrationBoundary>
  )
}

export default BestTours
