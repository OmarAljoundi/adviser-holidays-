'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge, Button, Card, Image } from '@nextui-org/react'
import { Separator } from '@radix-ui/react-separator'
import { ArrowLeft, CalendarDays, Clock, MapPin } from 'lucide-react'
import { FunctionComponent } from 'react'

interface TourListingLoadingProps {}

const TourListingLoading: FunctionComponent<TourListingLoadingProps> = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-6 xl:gap-8 gap-y-6">
      {Array.from(new Array(8))?.map((_, index) => (
        <Card className="space-y-5 p-4" radius="lg" key={index}>
          <Skeleton className="rounded-lg duration-700">
            <div className="aspect-[3/2] rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default TourListingLoading
