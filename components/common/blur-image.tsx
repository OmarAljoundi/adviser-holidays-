'use client'
import cn from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import type { ComponentProps } from 'react'

type ImageProps = ComponentProps<typeof Image> & { containerClassName?: string }

export default function BlurImage(props: ImageProps) {
  const [isLoading, setLoading] = useState(true)

  return (
    <div className={cn(props?.containerClassName)}>
      <Image
        {...props}
        alt={props.alt}
        className={cn(props.className, 'duration-700 ease-in-out rounded-medium', isLoading ? 'scale-105 blur-lg' : 'scale-100 blur-0')}
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}
