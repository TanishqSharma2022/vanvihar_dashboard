import { Questions, columns } from "./columns";
import { DataTable } from "./DataTable";
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BreadCrumb from "@/components/breadcrumb";

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

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto w-[80vw] overflow-scroll h-full ">
      <div className="">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex justify-between  mt-4">
          <div>
            <h1 className="text-3xl font-bold">Questions ({data.length})</h1>
          </div>
          <Link href="/questions/add">
            <Button className="flex gap-2">
              <FaPlus />
              Add a new Question
            </Button>
          </Link>
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
}
