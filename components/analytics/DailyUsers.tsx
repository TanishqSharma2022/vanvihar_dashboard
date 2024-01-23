import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChartAnalytics } from "./barChart";
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

const apiUrl = 'https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizResult/getDailyPlayers';

interface DailyUsers {
  name: string;
  total: number;
}

async function fetchDailyUsers(date: string): Promise<number> {
  try {
    
    const response = await fetch(`${apiUrl}?date=${date}`);
    const data = await response.json();

    return data.data.length; // Assuming the response is an array of users
  } catch (error) {
    console.error(`Error fetching data for ${date}:`, error);
    return 0; // Return 0 users in case of an error
  }
}

interface LastWeekData {
  [date: string]: number;
}

async function fetchLastWeekData(): Promise<LastWeekData> {
  const lastWeekData: LastWeekData = {};

  // Get today's date
  const today = new Date();

  // Iterate over the last 7 days
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() - i);

    const formattedDate = currentDate.toISOString().split('T')[0];

    const dailyUsers = await fetchDailyUsers(formattedDate);

    // Store the result for the current date
    lastWeekData[formattedDate] = dailyUsers;
  }

  return lastWeekData;
}

// Example usage



const DailyUsers = () => {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        async function getUsers(){
        await fetchLastWeekData().then((result) => {
            // You can now use the result as needed, for example, store it in state or perform other operations
            const us  = Object.entries(result).map(([name, total]) => ({ name, total }));

            setUsers(us)

          });
        }
        getUsers()
    }, [])


  return (
    <>
        {users.length !== 0 &&  
            <BarChartAnalytics data={users} />
        }
        {!users &&  
            <SyncLoader color="#214D3C" />
        }
    </>
  );
}


export default DailyUsers;