import AddQuestion from '@/components/actions/addQuestion'
import React from 'react'
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BreadCrumb from "@/components/ui/breadcrumb";

const breadcrumbItems = [{ title: "Question", link: "/dashboard/questions" },{ title: "Add Question", link: "/dashboard/questions/add" }];

const Add = () => {
  return (
    <div className='h-[100vh] overflow-scroll'>
    <div className='px-12 py-4 '>
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex justify-between  mt-4 ">
          <div>
            <h1 className="text-3xl font-bold">Add a new Question!</h1>
          </div>
        </div>
      </div>
      <AddQuestion />
    </div>
  )
}

export default Add
