import { Card, Skeleton } from '@nextui-org/react'
import { FunctionComponent } from 'react'

interface VisaCardLoadingProps {}

const VisaCardLoading: FunctionComponent<VisaCardLoadingProps> = () => {
  return (
    <Card className="w-full space-y-5" radius="lg">
      <Skeleton className="w-[90%] mx-auto rounded-medium mt-5">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3  p-4">
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
  )
}

export default VisaCardLoading
