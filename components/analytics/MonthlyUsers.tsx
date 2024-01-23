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

const apiUrl = 'https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizResult/getMonthlyPlayers';

interface DailyUsers {
  month: string;
  users: number;
}

async function fetchDailyUsers(month: string): Promise<number> {
  try {
    
    const response = await fetch(`${apiUrl}?month=${month}`);
    const data = await response.json();

    return data.data.length; // Assuming the response is an array of users
  } catch (error) {
    console.error(`Error fetching data for ${month}:`, error);
    return 0; // Return 0 users in case of an error
  }
}

interface LastWeekData {
  [date: string]: number;
}

// async function fetchLastWeekData(): Promise<LastWeekData> {
//   const lastWeekData: LastWeekData = {};

//   // Get today's date
//   const today = "01"

//   // Iterate over the last 7 days
//   for (let i = 0; i < 7; i++) {
//     const currentDate = new Date(today);
//     currentDate.setDate(today.getDate() - i);

//     const formattedDate = currentDate.toISOString().split('T')[0];

//     const dailyUsers = await fetchDailyUsers(formattedDate);

//     // Store the result for the current date
//     lastWeekData[formattedDate] = dailyUsers;
//   }

//   return lastWeekData;
// }




interface MonthlyUserData {
    name: string; // Month name
    total: number; // Number of users
  }
  const getMonthName = (month: number): string => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return monthNames[month - 1] || '';
  };

const MonthlyUsers = () => {
    const [monthlyUserData, setMonthlyUserData] = useState<MonthlyUserData[]>([]);

    useEffect(() => {
        async function fetchData() {
          try {
            // Array to store data for all months
            const allMonthsData: MonthlyUserData[] = [];
    
            // Loop through months from 01 to 12
            for (let month = 1; month <= 12; month++) {
              const response = await fetch(
                `https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizResult/getMonthlyPlayers?month=${month
                  .toString()
                  .padStart(2, '0')}`
              );
    
              if (response.ok) {
                const result = await response.json();
                // Convert the result to the desired format
                const formattedData: MonthlyUserData = {
                  name: getMonthName(month),
                  total: result.data.length || 0, // Use 0 if the result is falsy
                };
    
                allMonthsData.push(formattedData);
              } else {
                console.error(`Failed to fetch data for month ${month}:`, response.statusText);
              }
            }
    
            // Set the entire monthly data array in state
            setMonthlyUserData(allMonthsData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
        fetchData();
      }, []);

      console.log(monthlyUserData)

  return (
    <>
        {monthlyUserData.length !== 0 &&  
            <BarChartAnalytics data={monthlyUserData} />
    }
      {!monthlyUserData &&  
            <SyncLoader color="#214D3C" />
        }
    </>
  );
}


export default MonthlyUsers;