'use client'

import { FunctionComponent, ReactNode } from 'react'
import { NextUIProvider as UIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

interface NextUIProviderProps {
  children: ReactNode
}

const NextUIProvider: FunctionComponent<NextUIProviderProps> = ({ children }) => {
  const router = useRouter()
  return <UIProvider navigate={router.push}>{children}</UIProvider>
}

export default NextUIProvider
