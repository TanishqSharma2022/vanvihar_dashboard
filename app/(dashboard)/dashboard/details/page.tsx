import UpdateQuestionDetails from "@/components/UpdateDetails";
import BreadCrumb from "@/components/breadcrumb";

const breadcrumbItems = [{ title: "Question Details", link: "/details" }];

export default function QuestionDetails({ params }: { params: { id: string } }) {
    return <div className="">
        
        <div className='px-12 py-4 overflow-scroll '>
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex justify-between  mt-4 ">
          <div>
            <h1 className="text-3xl font-bold">Update Question Details!</h1>
          </div>
        </div>
      </div>
  <UpdateQuestionDetails />
        
        </div>
}