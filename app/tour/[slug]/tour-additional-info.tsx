import { Separator } from '@/components/ui/separator'
import React from 'react'

export default function TourAdditionalInfo({additionalInfo}:{additionalInfo:string}) {
  return (
    <div className="relative shadow-custom rounded-medium p-4">
    <h4 className="mb-0 text-2xl font-semibold font-primary"> معلومات عن الرحلة</h4>
    <Separator className="my-4" />
    <p className="text-base text-gray-600">{additionalInfo}</p>
  </div>
  )
}
