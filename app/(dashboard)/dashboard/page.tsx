"use client";



import React from "react";

import { RecentUsers } from "@/components/analytics/recentUsers";
import { BestScorers } from "@/components/analytics/BestScorers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import DailyUsers from "@/components/analytics/DailyUsers";
import MonthlyUsers from "@/components/analytics/MonthlyUsers";

const App = () => {
  return (
    <div className="px-2 md:p-4">
      <div className="flex items-center py-4 justify-between space-y-2 px-4 md:px-12">
        <h2 className="text-3xl font-bold tracking-tight">
          Hi, Welcome back 👋
        </h2>
        {/* <div className="hidden md:flex items-center md:space-x-2"></div> */}
      </div>
      <div className="md:p-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-11 items-top  ">
        <Card className="col-span-5 shadow-lg">
          <CardHeader>
            <CardTitle>
              Best Scorers
            </CardTitle>
          </CardHeader>

          <BestScorers />
        </Card>
    


        <Card className="col-span-6 shadow-lg ">
          <CardHeader>
            <CardTitle>Daily Users</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DailyUsers />
          </CardContent>
        </Card>

        <Card className="col-span-6 shadow-lg ">
          <CardHeader>
            <CardTitle>Monthly Users</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <MonthlyUsers />
          </CardContent>
        </Card>

        <Card className="col-span-5 shadow-lg">
          <CardHeader>
            <CardTitle>
              Recent Users
            </CardTitle>
          </CardHeader>


          <RecentUsers />
        </Card>

       
      </div>
    </div>
  );
};

export default App;
