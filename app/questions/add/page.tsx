import AddQuestion from '@/components/addQuestion'
import React from 'react'
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BreadCrumb from "@/components/breadcrumb";

const breadcrumbItems = [{ title: "Question", link: "/questions" },{ title: "Add Question", link: "/ques/add" }];

const Add = () => {
  return (
    <div>
    <div className='px-12 py-4 h-full overflow-scroll'>
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex justify-between  mt-4">
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
