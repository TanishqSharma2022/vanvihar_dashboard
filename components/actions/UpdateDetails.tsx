"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MultiSelect } from "react-multi-select-component";
import { useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { options } from "@/constants/data";
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select_shad } from "../ui/select";
import { Select } from "@radix-ui/react-select";
import { Checkbox } from "../ui/checkbox";

const formSchema = z.object({
  questionCount: z.coerce.number(),
  marksEasy: z.coerce.number(),
  marksMedium: z.coerce.number(),
  marksHard: z.coerce.number(),
  tags: z.array(z.string()),
  isGeofenceEnabled: z.boolean(),
  range: z.coerce.number(),
  timeLimit: z.coerce.number(),
  limitLatitude: z.coerce.number(),
  limitLongitude: z.coerce.number()
});

interface QuestionDetails {
    questionCount: number,
    marksEasy: number,
    marksMedium: number,
    marksHard: number,
    tags: string[],
    isGeofenceEnabled: boolean, 
    range: number, 
    timeLimit: number,
    limitLatitude: number, 
    limitLongitude: number
}

const tags = [
    "Elephant",
    "Tiger",
    "Mammals",
    "Herbivore",
    "Carnivore",
    "Birds",
    "Trees",
    "Reptiles",
    "Butterfly",
    "Lion",
    "Giraffe",
    "Kangaroo",
    "Panda",
    "Hippopotamus",
    "Reindeer",
    "Zebra",
    "Gorilla",
    "Penguin",
    "Ostrich",
    "Hummingbird",
    "Peacock",
    "Parrot",
    "Owl",
    "Crocodile",
    "Snake",
    "Lizard",
    "Frog",
    "Turtle",
    "Banyan Tree",
    "Oak Tree",
    "Maple Tree",
    "Pine Tree",
    "Bamboo",
    "Cherry Blossom",
    "Rose",
    "Sunflower",
    "Tulip",
    "Butterfly",
    "Dragonfly",
    "Monarch Butterfly",
    "Swallowtail Butterfly",
  ];
  

function UpdateQuestionDetails() {
  const [loading, setLoading] = useState(false);

  const [geofence, setGeofence] = useState(false);
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [ques, setQues] = useState<QuestionDetails>({
    questionCount: 0,
    marksEasy: 0,
    marksMedium: 0,
    marksHard: 0,
    tags: [""],
    isGeofenceEnabled: false,
    range: 0,
    timeLimit: 0,
    limitLatitude: 0,
    limitLongitude: 0,
  });

  useEffect(() => {
    async function getQuestion() {
      try {
        const response = await fetch(
                "https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizDetails/get"
        );

        const data = await response.json();
        setQues(data.data);
      console.log(data)
        const defaultValues = {
          questionCount: data.data.questionCount || 0,
          marksEasy: data.data.marksEasy || 0,
          marksMedium: data.data.marksMedium || 0,
          marksHard: data.data.marksHard || 0,
          tags: data.data.tags.length !== 0 ?  data.data.tags : tags,
          isGeofenceEnabled: data.data.isGeofenceEnabled || false,
          range: data.data.range || 0,
          timeLimit: data.data.timeLimit || 0,
          limitLatitude: data.data.limitLatitude || 0,
          limitLongitude: data.data.limitLongitude || 0,
        };

        form.reset(defaultValues);
      } catch (error) {
        console.error("Error fetching question details:", error);
        toast.error("Error Updating Question Details");
      }
    }
    getQuestion();
  }, [ form]);

  const [hasAttachment, setHasAttachment] = React.useState(false);
  const [isText, setIsText] = React.useState(true)
  const router = useRouter();
    
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // try {
    //   setLoading(true);
    //   const response = await fetch(
    //     `https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizQuestion/updateQuestion?id=${params.id}`,
    //     {
    //       method: "PATCH",
    //       body: JSON.stringify({"data":{
    //         questionCount: values.questionCount,
    //         marksEasy: values.marksEasy,
    //         marksMedium: values.marksMedium,
    //         marksHard: values.marksHard,
    //         tags: values.tags,
    //       }}),
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //     }
    //   );
    // } catch (error) {
    //   console.error("Error updating question details:", error);
    //   toast.error("Error updating Question details");
    // } finally {
    //   setLoading(false);
    //   toast.success("Question Details updated successfully...");
    // //   window.location.reload();
    //   router.push("/dashboard/details");
    // }
    console.log(values)
  };

  return (
    <div className="p-4 h-full  md:px-12">
      <div className="w-full h-full  ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" h-full ">
            {/* QUESTION SECTION */}
            <div className="w-full py-2">
              <h1 className="font-bold text-xl">QUESTION DETAILS</h1>
              <Separator className="my-4" />

              <div className="grid  gap-6">
                <div className="grid grid-cols-1 ">
                  {/* QUESTION */}
                  <FormField
                    control={form.control}
                    name="questionCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Label htmlFor="question">Question Count</Label>
                        </FormLabel>
                        <FormControl>
                          <Input  placeholder="Question Count" {...field} type="text" value={Number(field.value)} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* OPTIONS */}

                  
                </div>

                <Separator className="my-2" />
                <h1 className="font-bold text-xl">MARKING SCHEME</h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {/* CORRECT ANSWER */}

                  <FormField
                    control={form.control}
                    name="marksEasy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Label htmlFor="marksEasy">Easy Questions</Label>
                        </FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="marksMedium"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Label htmlFor="marksMedium">Medium Questions</Label>
                        </FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="marksHard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Label htmlFor="marksHard">Hard Questions</Label>
                        </FormLabel> 
                        <FormControl>
                          <Input type="text" placeholder="0" {...field} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* ATTACHMENTS */}
               
                </div>
              </div>
            </div>
            <div className="w-full py-2">
              <Separator className="my-2" />
              <div className="md:grid md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <div>
                      <Label>Tags</Label>
                      <MultiSelect
                        options={options}
                        value={(field.value || []).map((value) => ({ label: value, value }))}
                        onChange={(selected: Array<{ label: string; value: string }>) => {
                            const selectedValues = selected.map((item) => item.value);
                            field.onChange(selectedValues);
                        }}
                        labelledBy="Select"
                        />

                   

                    </div>
                  )}
                />

              <FormField
                    control={form.control}
                    name="timeLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Label htmlFor="timeLimit">Time Limit</Label>
                        </FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />



              </div>
            </div>

         










            <div className="w-full py-2">
              <Separator className="my-2" />
              <h1 className="font-bold text-xl">GEOFENCING DETAILS</h1>
              <div className="md:grid md:grid-cols-1 gap-6 mt-4">
              <FormField
                      control={form.control}
                      name="isGeofenceEnabled"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Checkbox
                              onCheckedChange={field.onChange}
                              checked={field.value}
                              onClick={() => setHasAttachment(!hasAttachment)}
                            />
                          </FormControl>
                          <FormLabel>
                            <Label htmlFor="question" className="px-4">
                              Enable Geofencing
                            </Label>
                          </FormLabel>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  {hasAttachment && 

                  <div className=" grid md:grid-cols-3 gap-6">
                          <FormField
                                      control={form.control}
                                      name="range"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>
                                            <Label htmlFor="range">Range</Label>
                                          </FormLabel>
                                          <FormControl>
                                            <Input type="text" placeholder="0" {...field} />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />


                                    <FormField
                                    control={form.control}
                                    name="limitLatitude"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          <Label htmlFor="limitLatitude">Center Latitude</Label>
                                        </FormLabel>
                                        <FormControl>
                                          <Input type="number" placeholder="0" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                  control={form.control}
                                  name="limitLongitude"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>
                                        <Label htmlFor="limitLongitude">Center Longitude</Label>
                                      </FormLabel>
                                      <FormControl>
                                        <Input type="number" placeholder="0" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                    </div>
                  }

              </div>
            </div>






            

            <div className="col-span-3 my-2">
              <Button className="" type="submit" disabled={loading}>
                Update Details
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UpdateQuestionDetails;
