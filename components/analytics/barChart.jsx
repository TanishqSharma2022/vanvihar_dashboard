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
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} height={400}>
        <XAxis
          dataKey={Object.keys(data[0])[0]}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={true}
        >
          </XAxis>
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        >
          <Label value={Object.keys(data[0])[0]} offset={-15} angle={-90} position="left" />

        </YAxis>
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="users" fill="#214D3C" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}