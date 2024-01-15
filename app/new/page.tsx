// // YourComponent.tsx

// import React from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm, SubmitHandler, Control, Controller } from 'react-hook-form';

// import * as z from 'zod';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription} from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Label } from '@/components/ui/label';

// const formSchema = z.object({
//   question: z.string().min(2, { message: 'At least 2 characters' }),
//   correctAnswer: z.string().min(2, { message: 'At least 2 characters' }),
//   hasAttachment: z.boolean().default(false).optional(),
//   answerAttachment: z.string().optional(),
//   descriptionAttachment: z.string().min(2, { message: 'At least 2 characters' }),
//   answerType: z.string().default('basic'),
//   difficulty: z.string().default('easy'),
//   species: z.string().default('carnivore'),
//   selectedItems: z.array(z.string()).min(2, { message: 'At least 2 options' }),
// });
// // ... (existing imports)

// interface MultiSelectProps {
//   label: string;
//   options: { value: string; label: string }[];
//   control: Control;
//   name: string;
// }

// const MultiSelect: React.FC<MultiSelectProps> = ({ label, options, control, name }) => {
//   return (
//     <div>
//       <label>{label}</label>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => (
//           // <Select
//           //   isMulti
//           //   options={options}
//           //   value={field.value}
//           //   onChange={(selectedOptions) => field.onChange(selectedOptions)}
//           // />
//           <></>
//         )}
//       />
//     </div>
//   );
// };

// function App() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       question: "",
//       correctAnswer: "",
//       hasAttachment: false,
//       descriptionAttachment: "",
//       answerAttachment: "",
//       answerType: "text",
//       difficulty: "easy",
//       species: "carnivore",
//       selectedItems: [], // Adding the multiselect field
//     },
//   });

//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values);
//   }

//   return (
//     <div className="p-4 md:p-12">
//       <div className="w-full flex items-center justify-center ">
//         <h1 className="font-bold text-2xl  uppercase">Dashboard</h1>
//       </div>

//       <div className="w-full md:px-24">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-12 p-12">
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
//                   <FormDescription>
//                     This is your public display name.
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

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

//               {form.getValues('hasAttachment') && (
//                 <FormField
//                   control={form.control}
//                   name="answerAttachment"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>
//                         <Label htmlFor="answerAttachment">Answer Image Link</Label>
//                       </FormLabel>
//                       <FormControl>
//                         {/* <ImageUpload val={field.value} /> */}
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               )}
//             </div>

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
//               name="answerType"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     <Label htmlFor="questionType">Question Type</Label>
//                   </FormLabel>
//                   <FormControl>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Question Type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="image">Image</SelectItem>
//                         <SelectItem value="audio">Audio</SelectItem>
//                         <SelectItem value="basic">Basic</SelectItem>
//                       </SelectContent>
//                     </Select>
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
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Difficulty" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="easy">Easy</SelectItem>
//                         <SelectItem value="medium">Medium</SelectItem>
//                         <SelectItem value="hard">Hard</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="species"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     <Label htmlFor="species">Species</Label>
//                   </FormLabel>
//                   <FormControl>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Species" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="carnivore">Carnivore</SelectItem>
//                         <SelectItem value="herbivore">Herbivore</SelectItem>
//                         <SelectItem value="reptile">Reptile</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="col-span-3">
//               <Button type="submit">Submit</Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default App;
