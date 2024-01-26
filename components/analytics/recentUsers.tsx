import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";


export interface User {
    id:string,
    uid: string,
    displayPicture: string,
    name: string,
    email: string,
    score: number,
    timeTaken: number;

}

export function RecentUsers() {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        async function getUsers(){
            const response = await fetch('https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizResult/getLeaderBoard')
            const data = await response.json();



  // SOrting data through date...
            const sortedData = data.data.sort((a:any, b:any) => {
                const dateA:any = new Date(a.createdAt);
                const dateB:any = new Date(b.createdAt);
            
                // Compare the dates in descending order
                return dateB - dateA;
            });
            

            setUsers(sortedData)
        }
        getUsers()
    }, [])
  return (
    <div className="space-y-8  rounded-xl  m-4">
    {users.map((user:User, index)=>(
           
           index < 5 &&
           <div className="flex items-center" key={index}>

            <Avatar className="h-9 w-9">
            <AvatarImage src={user.displayPicture} alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-sm text-muted-foreground">
                {user.email}
            </p>
            </div>
            <div className="ml-auto font-medium">{user.score}</div>
        </div>
        ))}
  
        </div>
  );
}