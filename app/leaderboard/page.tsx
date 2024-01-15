
import { LeaderBoard, columns } from "./columns"
import { DataTable } from "./DataTable"

import BreadCrumb from "@/components/breadcrumb";
const breadcrumbItems = [{ title: "Leaderboard", link: "/leaderboard" }];

async function getData(): Promise<LeaderBoard[]> {
  // Fetch data from your API here.
  const response = await fetch('https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizResult/getLeaderBoard')
            const data = await response.json()


  return data.data.reverse()
    // ...
  
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto  h-full md:w-[80vw] overflow-scroll">
 <div className="">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex justify-between py-2">
          <div>
            <h1 className="text-3xl font-bold py-2">Leaderboard ({data.length})</h1>
          </div>
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}
