import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { FunctionComponent } from 'react'

interface DestinationLoadingProps {}

const DestinationLoading: FunctionComponent<DestinationLoadingProps> = () => {
  const DestinationCard = () => {
    return (
      <div className={cn('block citiesCard -type-1 d-block rounded-4 group hover:cursor-pointer col-span-6 lg:col-span-4')}>
        <div className={cn('h-80', 'citiesCard__image ratio')}>
          <div className="h-full aspect-w-1 aspect-h-1 w-full overflow-hidden  bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <Skeleton className="object-cover" />
          </div>
        </div>
        <div className="citiesCard__content flex flex-col justify-between text-center pt-8 pb-5 px-5">
          <div className="citiesCard__bg" />
          <div className="citiesCard__top">
            <div className="text-14 text-white fw-bold" dir="rtl">
              <Skeleton className="object-cover w-16 h-4" />
            </div>
          </div>
          <div className="citiesCard__bottom translate-y-16 group-hover:translate-y-0 transition-all">
            <figcaption
              className="absolute p-2 bottom-0 right-0 mx-auto w-fit  left-0  mb-16  sm:left-5 flex   justify-between  border border-white
              bg-white/75 rounded-xl shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm"
            >
              <h4 className="text-sm xl:text-xl md:text-xl text-black">
                {' '}
                <Skeleton className="object-cover w-16 h-4" />
              </h4>
            </figcaption>

            <Skeleton className="object-cover w-16 h-4" />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="container mt-10 mb-10 hidden md:block">
      <div className="flex justify-between items-end">
        <h1 className="text-xl">الأقسام</h1>
      </div>
      <Separator className="my-4" />
      <div className="lg:grid grid-cols-12 gap-4 hidden">
        {Array.from(new Array(9)).map((item, index) => (
          <DestinationCard key={index} />
        ))}
      </div>
      <div className="grid grid-cols-12 gap-4 lg:hidden">
        {Array.from(new Array(2)).map((item, index) => (
          <DestinationCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default DestinationLoading
