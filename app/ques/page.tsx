import React from 'react'
import DemoPage from '../questions/page'
import { FaPlus } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import BreadCrumb from '@/components/breadcrumb'

const breadcrumbItems = [{ title: "Questions", link: "/ques" }];
const Ques = () => {
  return (
    <div className='w-[80vw] h-full overflow-scroll  p-4'>

 <DemoPage />
      
    </div>
  )
}

export default Ques
