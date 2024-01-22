import UpdateQuestion from "@/components/actions/updateQuestion";
import BreadCrumb from "@/components/ui/breadcrumb";

const breadcrumbItems = [{ title: "Question", link: "/dashboard/questions" },{ title: "Update Question", link: "/dashboard/questions/update" }];

export default function Update({ params }: { params: { id: string } }) {
    return <div className="">
        
        <div className='px-12 py-4 '>
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex justify-between  mt-4 ">
          <div>
            <h1 className="text-3xl font-bold">Update a Question!</h1>
          </div>
        </div>
      </div>
        <UpdateQuestion params={params} />
        
        </div>
}