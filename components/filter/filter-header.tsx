import { LucideIcon } from 'lucide-react'
import { FunctionComponent } from 'react'
import { Separator } from '../ui/separator'

interface FilterHeaderProps {
  icon?: any
  title: string
  divider?: boolean
}

const FilterHeader: FunctionComponent<FilterHeaderProps> = ({ icon: Icon, title, divider }) => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="text-lg">{title}</h1>
      </div>
      {divider && <Separator />}
    </>
  )
}

export default FilterHeader
