


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

export function MostAttemptedQues() {
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
    <div className="space-y-8 md:max-w-[400px] w-auto border rounded-xl p-6 shadow-lg mt-6 md:m-6">
    <h1 className="font-bold text-xl">Most Correctly Attempted Species</h1>


    </div>
  );
}