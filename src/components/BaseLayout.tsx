'use client'

import Topbar from './Topbar'
import { Metadata } from 'next'
import React from 'react'

interface BaseLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Teacher AId',
  description: 'AI help to create lesson plans',
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="">
      <Topbar />
      <main>{children}</main>
      <footer>{/* TBD */}</footer>
    </div>
  )
}

export default BaseLayout
