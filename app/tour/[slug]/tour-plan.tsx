'use client'
import BlurImage from '@/components/common/blur-image'
import IconTourProvider from '@/provider/icon-tour-provider'
import { Tour } from '@/types/custom'
import { Accordion, AccordionItem, Avatar, Chip } from '@nextui-org/react'
import { FunctionComponent, ReactNode } from 'react'
import { RxPlus } from 'react-icons/rx'
interface TourPlanProps {
  tour: Tour
}

const TourPlan: FunctionComponent<TourPlanProps> = ({ tour }) => {
  const AccordianItems = () => {
    return tour.tour_sections?.map((section, index) => (
      <AccordionItem
        className="px-0"
        classNames={{
          titleWrapper: 'text-right',
        }}
        indicator={
          <IconTourProvider>
            <RxPlus />
          </IconTourProvider>
        }
        key={section.uuid}
        aria-label={section.title}
        startContent={
          <Chip color="primary" radius="lg">
            {(index + 1).toString()}
          </Chip>
        }
        title={section.title}
      >
        <div className="grid grid-cols-12 justify-between gap-x-2 items-start overflow-hidden">
          <div className="col-span-9">
            <p>{section.description}</p>
          </div>
          <div className="col-span-3">
            {section.image && <BlurImage src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${section.image}`} alt={section.title} width={300} height={150} />}
          </div>
        </div>
      </AccordionItem>
    ))
  }

  return (
    <Accordion
      variant="splitted"
      selectionMode="multiple"
      style={{ padding: 0 }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            height: 'auto',
            transition: {
              height: {
                type: 'spring',
                stiffness: 500,
                damping: 30,
                duration: 1,
              },
              opacity: {
                easings: 'ease',
                duration: 1,
              },
            },
          },
          exit: {
            y: -10,
            opacity: 0,
            height: 0,
            transition: {
              height: {
                easings: 'ease',
                duration: 0.25,
              },
              opacity: {
                easings: 'ease',
                duration: 0.3,
              },
            },
          },
        },
      }}
    >
      {AccordianItems() as any}
    </Accordion>
  )
}

export default TourPlan
