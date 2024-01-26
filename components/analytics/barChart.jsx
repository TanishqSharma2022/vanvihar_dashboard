"use client";

import { Bar, BarChart, Label, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// const data = [
//   {
//     name: "Jan",
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: "Feb",
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: "Mar",
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: "Apr",
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: "May",
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: "Jun",
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: "Jul",
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: "Aug",
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: "Sep",
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: "Oct",
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: "Nov",
//     total: Math.floor(Math.random() * 50) + 10,
//   },
//   {
//     name: "Dec",
//     total: Math.floor(Math.random() * 50) + 10,
//   },
// ];

export function BarChartAnalytics({data}) {
  return (
    <ResponsiveContainer width="100%" height={300} >
      <BarChart data={data} height={300}>
        <XAxis
          dataKey={Object.keys(data[0])[0]}
          stroke="#5C8374"
          fontSize={12}
          tickLine={false}
          axisLine={true}
        >
          <Label value={Object.keys(data[0])[0]} position="bottom" />

          </XAxis>
        <YAxis
          stroke="#5C8374"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        >

        </YAxis>
        <Tooltip />
        <Bar dataKey="users" fill="#5C8374" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}