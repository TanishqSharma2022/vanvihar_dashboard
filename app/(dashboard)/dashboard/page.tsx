"use client";

import { BarChartAnalytics } from "@/components/analytics/barChart";
// import * as React from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, UseFormRegister, useForm } from "react-hook-form";

// import * as z from "zod";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import {
//   Select_shad,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import Select from "react-select"

// import {MultiSelect} from "react-multi-select-component";
// import { Textarea } from "@/components/ui/textarea";
// import { useRouter } from "next/navigation";

// const formSchema = z.object({
//   question: z.string().min(2, { message: "At least 2 characters" }),
//   correctAnswer: z.string().min(2, { message: "At least 2 characters" }),
//   answerChoices: z.array(z.string()).min(2, { message: "At least 2 options" }),
//   hasAttachment: z.boolean().default(false).optional(),
//   attachmentType: z.string(),
//   descriptionAttachment: z
//     .string()
//     .min(2, { message: "At least 2 characters" }),
//   attachment: z.string().optional(),
//   answerDescription: z.string(),
//   answerType: z.string().default("text"),
//   difficulty: z.string().default("easy"),
//   tags: z.array(z.string())
// });

// function App() {
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const options = [
//     {label:"Elephant",value:"Elephant"},
//     {label:"Tiger",value: "Tiger"},
//     {label:"Mammals",value: "Mammals"},
//     {label:"Herbivore",value: "Herbivore"},
//     {label:"Carnivore",value: "Carnivore"},
//     {label:"Birds",value: "Birds"},
//     {label:"Trees",value: "Trees"},
//     {label:"Reptiles",value: "Reptiles"},
//     {label:"Butterfly",value: "Butterfly"}
//   ]

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       question: "",
//       correctAnswer: "",
//       answerChoices: [],
//       hasAttachment: false,
//       attachmentType: "",
//       descriptionAttachment: "",
//       attachment: "",
//       answerDescription: "",
//       answerType: "text",
//       difficulty: "easy",
//       // species: "carnivore",
//       tags: []
//     },
//   });

//   const router = useRouter();

//   const [hasAttachment, setHasAttachment] = React.useState(false);
//   // 2. Define a submit handler.
//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     console.log(values);
//     try {
//       setLoading(true);
//       const response = await fetch(
//         "https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizQuestion/add",
//         {
//           method: "POST",
//           body: JSON.stringify({
//             question: values.question,
//             correctAnswer: values.correctAnswer,
//             answerChoices: values.answerChoices,
//             hasAttachment: values.hasAttachment,
//             attachmentType: values.attachmentType,
//             descriptionAttachment: values.descriptionAttachment,
//             attachment: values.attachment,
//             answerType: values.answerType,
//             answerDescription: values.answerDescription,
//             difficulty: values.difficulty,
//             tags: values.tags
//           }),
//           headers: {
//             "Content-type": "application/json",
//           },
//         }
//       );

//     } catch (error) {
//       console.error("Error adding question:", error);
//       toast.error("Error Uploading Question");
//     } finally {
//       setLoading(false);
//       toast.success("Question added successfully");
//       router.refresh()
//     }
//   };

//   return (
//     <div className="p-4 md:p-12">
//       <div className="w-full flex items-center justify-center ">
//         <h1 className="font-bold text-2xl  uppercase">Dashboard</h1>
//       </div>

//       <div className="w-full md:px-24">
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="grid grid-cols-3 gap-12 p-12"
//           >

//             <FormField
//               control={form.control}
//               name="answerType"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     <Label htmlFor="answerType">Option Type</Label>
//                   </FormLabel>
//                   <FormControl>
//                     <Select_shad
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Option Type (TEXT / IMAGE)" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="image">Image</SelectItem>
//                         <SelectItem value="text">Text</SelectItem>
//                       </SelectContent>
//                     </Select_shad>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//     <FormField
//         control={form.control}
//         name="tags"
//         render={({ field}) => (

//         <div>
//         <Label>Tags</Label>
//           <MultiSelect
//             options={options}
//             value={field.value.map((value) => ({ label: value, value }))}
//             onChange={(selected:string) => {
//               // Transform selected options to an array of strings
//               const selectedValues = selected.map((item:any) => item.value);
//               // Trigger field-level onChange
//               field.onChange(selectedValues);
//             }}
//             labelledBy="Select"
//           />
// </div>
//         )}
//       />

//             <FormField
//               control={form.control}
//               name="question"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     <Label htmlFor="question">Question</Label>
//                   </FormLabel>
//                   <FormControl>
//                     <Input placeholder="Question" {...field} />
//                   </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* OPTIONS */}
//             <div className="grid grid-cols-1">
//             {[0, 1, 2, 3].map((index) => (
//               <FormField
//                 key={index}
//                 control={form.control}
//                 name={`answerChoices.${index}`}
//                 render={({ field }) => (
//                   <div className="">
//                     <Label>Option {index + 1}</Label>
//                     <Input
//                       value={field.value}
//                       onChange={(value) => field.onChange(value)}
//                     />
//                   </div>
//                 )}
//               />
//             ))}
//             </div>

// {/* CORRECT ANSWER */}
//             <FormField
//               control={form.control}
//               name="correctAnswer"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     <Label htmlFor="correctAnswer">Correct Answer</Label>
//                   </FormLabel>
//                   <FormControl>
//                     <Input placeholder="Correct Answer" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* ATTACHMENTS */}
//             <div className="grid gap-3">
//               <FormField
//                 control={form.control}
//                 name="hasAttachment"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Checkbox
//                         onCheckedChange={field.onChange}
//                         checked={field.value}
//                         onClick={() => setHasAttachment(!hasAttachment)}
//                       />
//                     </FormControl>
//                     <FormLabel>
//                       <Label htmlFor="question" className="px-4">
//                         Does this have an Attachment?
//                       </Label>
//                     </FormLabel>

//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               {hasAttachment && (
// <>
//               <FormField
//               control={form.control}
//               name="attachment"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     <Label htmlFor="attachment">
//                       Answer Image Link
//                     </Label>
//                   </FormLabel>
//                   <FormControl>
//                   <Input placeholder="Answer Image URL " {...field} />
//                   </FormControl>

//                   <FormMessage />
//                 </FormItem>
//               )}
//               />

//                 <FormField
//                   control={form.control}
//                   name="attachmentType"
//                   render={({ field }) => (
//                     <FormItem>
//                   <FormLabel>
//                     <Label htmlFor="attachmentType">Attachment Type</Label>
//                   </FormLabel>
//                   <FormControl>
//                     <Select_shad
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Attachment Type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="image">Image</SelectItem>
//                         <SelectItem value="audio">Audio</SelectItem>
//                       </SelectContent>
//                     </Select_shad>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//                   )}
//                 />

// </>
//               )}
//             </div>

//             <FormField
//               control={form.control}
//               name="answerDescription"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     <Label htmlFor="answerDescription">
//                       Answer Description
//                     </Label>
//                   </FormLabel>
//                   <FormControl>
//                     <Textarea placeholder="Enter the description for answer here..." {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="descriptionAttachment"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     <Label htmlFor="descriptionAttachment">
//                       Description Image Link
//                     </Label>
//                   </FormLabel>
//                   <FormControl>
//                     <Input placeholder="Image URL" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="difficulty"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     <Label htmlFor="difficulty">Difficulty</Label>
//                   </FormLabel>
//                   <FormControl>
//                     <Select_shad

//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Difficulty" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="easy">Easy</SelectItem>
//                         <SelectItem value="medium">Medium</SelectItem>
//                         <SelectItem value="hard">Hard</SelectItem>
//                       </SelectContent>
//                     </Select_shad>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {/* <FormField
//               control={form.control}
//               name="species"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     <Label htmlFor="species">Species</Label>
//                   </FormLabel>
//                   <FormControl>
//                     <Select_shad
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Species" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="carnivore">Carnivore</SelectItem>
//                         <SelectItem value="herbivore">Herbivore</SelectItem>
//                         <SelectItem value="reptile">Reptile</SelectItem>
//                       </SelectContent>
//                     </Select_shad>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             /> */}
//             <div className="col-span-3">
//               <Button className="" type="submit" disabled={loading}>
//                 Submit
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default App;

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
      <div className="md:p-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 items-top  ">
        <Card className="col-span-3 shadow-lg">
          <CardHeader>
            <CardTitle>Best Scorers</CardTitle>
          </CardHeader>

          <BestScorers />
        </Card>
        <Card className="col-span-4 shadow-lg h-[500px]">
          <CardHeader>
            <CardTitle>Monthly Users</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <MonthlyUsers />
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-lg ">
          <CardHeader>
            <CardTitle>Daily Users</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DailyUsers />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;
