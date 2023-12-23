import { REVALIDATE_TOUR_TYPE } from '@/lib/keys'
import { getTourTypes } from '@/lib/operations'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { FunctionComponent } from 'react'
import TourTypesList from './tour-types-list'

interface TourTypeProps {}

const TourType: FunctionComponent<TourTypeProps> = async () => {
  const query = new QueryClient()
  query.prefetchQuery({
    queryKey: [REVALIDATE_TOUR_TYPE],
    queryFn: getTourTypes,
  })

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <TourTypesList />
    </HydrationBoundary>
  )
}

export default TourType
