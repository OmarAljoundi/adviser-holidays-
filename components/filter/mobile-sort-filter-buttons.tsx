'use client'
import { Button } from '@nextui-org/react'
import { ArrowDownUp, FilterIcon } from 'lucide-react'
import { FunctionComponent } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import Filter from '.'

interface MobileSortFilterButtonsProps {}

const MobileSortFilterButtons: FunctionComponent<MobileSortFilterButtonsProps> = () => {
  return (
    <div className="flex md:hidden gap-x-2">
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button isIconOnly variant="bordered" size="sm">
              <FilterIcon className="p-[2px]" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <Filter />
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <Button isIconOnly variant="ghost" size="sm">
          <ArrowDownUp className="p-[2px]" />
        </Button>
      </div>
    </div>
  )
}

export default MobileSortFilterButtons
