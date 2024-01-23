import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";


export interface User {
    id:string,
    uid: string,
    displayPicture: string,
    name: string,
    email: string,
    score: number,
    timeTaken: number;

}

export function BestScorers() {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        async function getUsers(){
            const response = await fetch('https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizResult/getLeaderBoard')
            const data = await response.json();
            setUsers(data.data)
        }
        getUsers()
    }, [])
  return (
    <div className="space-y-8  rounded-xl  m-4">

    {users && users.map((user:User, index)=>(
        index <5 &&
            <div className="flex items-center justify-between" key={index}>

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
        {users.length === 0 &&  
        <div className="flex flex-col items-center gap-4 justify-center w-full h-[200px]">
            <SyncLoader color="#214D3C" />
            <h1 className="font-semibold text-[#214D3C]">Loading the best scorers...</h1>

            </div>
        }
  

    </div>
  );
}