"use client";

import { Questions, columns } from "./columns";
import { DataTable } from "./DataTable";
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BreadCrumb from "@/components/breadcrumb";
import { useEffect, useState } from "react";

const breadcrumbItems = [{ title: "Questions", link: "/ques" }];

async function getData(): Promise<Questions[]> {
  // Fetch data from your API here.
  const response = await fetch(
    "https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizQuestion/getQuestionReport"
  );
  const data = await response.json();

  return data.data.reverse();
  // ...
}

export default function DemoPage() {
  const [data, setData] = useState<Questions[]>();
  useEffect(() => {
    async function getQuestion() {
      const res = await getData();
      setData(res);
    }
    getQuestion();
  }, []);

  return (
    <div className="px-12 p-4  md:w-[80vw] h-full ">
      <div className="">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex justify-between md:flex-row gap-4 flex-col mt-4">
          <div>
            <h1 className="text-3xl font-bold">Questions ({data?.length})</h1>
          </div>
          <Link href="/questions/add">
            <Button className="flex gap-2">
              <FaPlus />
              Add a new Question
            </Button>
          </Link>
        </div>
      </div>
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
}
