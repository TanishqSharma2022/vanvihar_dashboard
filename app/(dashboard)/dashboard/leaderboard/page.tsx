"use client";
import { useEffect, useState } from "react";
import { LeaderBoard, columns } from "./columns";
import { DataTable } from "./DataTable";

import BreadCrumb from "@/components/ui/breadcrumb";
import { SyncLoader } from "react-spinners";
const breadcrumbItems = [{ title: "Leaderboard", link: "/leaderboard" }];

async function getData(): Promise<LeaderBoard[]> {
  // https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizResult/getLeaderBoard
  // Fetch data from your API here.
  const response = await fetch(
    "https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizResult/getAllLeaderBoard"
  );
  const data = await response.json();

console.log(data.data);
  // SOrting data through date...
  const sortedData = data.data.sort((a:any, b:any) => {
    const dateA:any = new Date(a.createdAt);
    const dateB:any = new Date(b.createdAt);
  
    // Compare the dates in descending order
    return dateB - dateA;
  });
  


  // console.log(data.data);

  return sortedData;
  // ...
}

export default function DemoPage() {
  const [data, setData] = useState<LeaderBoard[]>();
  useEffect(() => {
    async function getQues() {
      const res = await getData();
      setData(res);
    }
    getQues();
  }, []);

  return (
    <div className=" container mx-auto  h-full md:w-[80vw] overflow-scroll">
      <div className="">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex justify-between py-2">
          <div>
            <h1 className="text-3xl font-bold py-2">
              Leaderboard ({data?.length})
            </h1>
          </div>
        </div>
      </div>
      {data && <DataTable columns={columns} data={data} />}
      {!data &&
      <>
        <div className="w-full h-[80vh] flex flex-col gap-4 items-center justify-center">
          <SyncLoader color="#214D3C" />
          <h1 className="font-semibold text-[#214D3C]">Loading the Leaderboard....</h1>
        </div>
      </>}
    </div>
  );
}
