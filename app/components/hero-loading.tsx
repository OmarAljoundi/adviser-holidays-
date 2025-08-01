'use client'
import { FunctionComponent } from 'react'
import SearchFilterLoading from './search-filter-loading'
import { Skeleton } from '@/components/ui/skeleton'

interface HeroLoadingProps {}

const HeroLoading: FunctionComponent<HeroLoadingProps> = () => {
  return (
    <div className="container">
      <div className="flex flex-col-reverse sm:grid sm:grid-cols-12">
        <div className="-mt-[40px] sm:mt-0 z-50 sm:z-0 col-span-12 sm:col-span-4 md:col-span-4 lg:col-span-4 ">
          <div className="w-full h-full">
            <SearchFilterLoading />
          </div>
        </div>
        <div className="col-span-12 h-36 sm:h-64 lg:h-96 md:h-72 sm:col-span-8 md:col-span-8 lg:col-span-8 overflow-hidden">
          <div className="relative h-full group overflow-hidden">
            <Skeleton className="h-full rounded-none px-3" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroLoading
