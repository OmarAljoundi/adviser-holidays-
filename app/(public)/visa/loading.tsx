'use client'
import { Skeleton } from '@/components/ui/skeleton'
import VisaCardLoading from './visa-card-loading'
import { Separator } from '@/components/ui/separator'

const LoadingVisa = () => {
  return (
    <div className="container mb-10">
      <Skeleton className="h-6 w-36 rounded-medium" />
      <Separator className="my-4" />

      <h1 className="text-primary text-2xl lg:text-4xl max-w-xs w-[75%] mx-auto  text-center my-10">
        <Skeleton className="h-6 w-full rounded-lg" />
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from(new Array(4)).map((_, index) => (
          <VisaCardLoading key={index} />
        ))}
      </div>
    </div>
  )
}

export default LoadingVisa
