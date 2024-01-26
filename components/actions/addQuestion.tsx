"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import {
  Select_shad,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import toast from "react-hot-toast";
import { MultiSelect } from "react-multi-select-component";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { options } from "@/constants/data";
import Select from "react-select";

const formSchema = z.object({
  question: z.string().min(2, { message: "At least 2 characters" }),
  correctAnswer: z.string().min(2, { message: "At least 2 characters" }),
  answerChoices: z.array(z.string()).min(2, { message: "At least 2 options" }),
  hasAttachment: z.boolean().default(false).optional(),
  attachmentType: z.string(),
  descriptionAttachment: z
    .string()
    .min(2, { message: "At least 2 characters" }),
  attachment: z.string().optional(),
  answerDescription: z.string(),
  answerType: z.string().default("text"),
  difficulty: z.string().default("easy"),
  tags: z.array(z.string()),
});

function AddQuestion() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      correctAnswer: "",
      answerChoices: [],
      hasAttachment: false,
      attachmentType: "",
      descriptionAttachment: "",
      attachment: "",
      answerDescription: "",
      answerType: "text",
      difficulty: "easy",
      tags: [],
    },
  });

  const [hasAttachment, setHasAttachment] = React.useState(false);

  const optionChoices = useWatch({
    control: form.control,
    name: "answerChoices",
    defaultValue: ["", "", "", ""], // Provide default values if needed
  });

  React.useEffect(() => {
    // You can log the answerChoices array here to see the values
    console.log("Answer Choices:", optionChoices);
  }, [optionChoices]);

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // try {
    //   setLoading(true);
    //   const response = await fetch(
    //     "https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizQuestion/add",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({
    //         question: values.question,
    //         correctAnswer: values.correctAnswer,
    //         answerChoices: values.answerChoices,
    //         hasAttachment: values.hasAttachment,
    //         attachmentType: values.attachmentType,
    //         descriptionAttachment: values.descriptionAttachment,
    //         attachment: values.attachment,
    //         answerType: values.answerType,
    //         answerDescription: values.answerDescription,
    //         difficulty: values.difficulty,
    //         tags: values.tags
    //       }),
    //       headers: {
    //         "Content-type": "application/json",
    //       },
    //     }
    //   );
    // } catch (error) {
    //   console.error("Error adding question:", error);
    //   toast.error("Error Uploading Question");
    // } finally {
    //   setLoading(false);
    //   toast.success("Question added successfully");
    //   window.location.reload();
    // }
  };

  return (
    <div className="p-4 h-full  md:px-12">
      <div className="w-full h-full  ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" h-full ">
            {/* QUESTION SECTION */}
            <div className="w-full ">
              <h1 className="font-bold text-xl">QUESTION</h1>
              <Separator className="my-4" />

              <div className="flex flex-col md:flex-row gap-6">
                <div className="grid grid-cols-1  ">
                  {/* QUESTION */}
                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Label htmlFor="question">Question</Label>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Question here..."
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* OPTIONS */}

                  <FormField
                    control={form.control}
                    name="answerType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Label htmlFor="answerType">Option Type</Label>
                        </FormLabel>
                        <FormControl>
                          <Select_shad
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Option Type (TEXT / IMAGE)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="image">Image</SelectItem>
                              <SelectItem value="text">Text</SelectItem>
                            </SelectContent>
                          </Select_shad>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator orientation="vertical" className="bg-red-400 my-4" />

                <div className="grid grid-cols-1 gap-4 ">
                  {optionChoices.map((name, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`answerChoices.${index}`}
                      render={({ field }) => (
                        <div className="">
                          <Label>Option {index + 1}</Label>
                          <Input
                            placeholder="Enter Text / Image URL"
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                            }}
                          />
                        </div>
                      )}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-6 ">
                  {/* CORRECT ANSWER */}
                  {/* <FormField
                    control={form.control}
                    name="correctAnswer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Label htmlFor="correctAnswer">Correct Answer</Label>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Correct Answer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

                  <FormField
                    control={form.control}
                    name="correctAnswer"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          <Label htmlFor="correctAnswer">Correct Answer</Label>
                        </FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="border p-2 max-w-[250px] rounded-lg text-sm"
                          >
                            <option value="">Select Correct Answer</option>
                            {optionChoices.map((value, index) => (
                              <option key={index} value={value}>
                                Option {index + 1}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* ATTACHMENTS */}
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="hasAttachment"
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
                            <Label htmlFor="hasAttachment" className="px-4">
                              Does this have an Attachment?
                            </Label>
                          </FormLabel>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {hasAttachment && (
                      <>
                        <FormField
                          control={form.control}
                          name="attachment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <Label htmlFor="attachment">
                                  Question Attachment Link
                                </Label>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Question Attachment URL"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="attachmentType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <Label htmlFor="attachmentType">
                                  Attachment Type
                                </Label>
                              </FormLabel>
                              <FormControl>
                                <Select_shad
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Attachment Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="image">Image</SelectItem>
                                    <SelectItem value="audio">Audio</SelectItem>
                                  </SelectContent>
                                </Select_shad>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ANSWER SECTION */}
            <div className="w-full ">
              <h1 className="font-bold text-xl">ANSWER</h1>
              <Separator className="my-4" />
              <div className="flex flex-col md:flex-row gap-12">
                <FormField
                  control={form.control}
                  name="descriptionAttachment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Label htmlFor="descriptionAttachment">
                          Answer Image Link
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Description Image URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="answerDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Label htmlFor="answerDescription">
                          Answer Description
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the description for answer here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* OTHER SECTION */}
            <div className="w-full ">
              <h1 className="font-bold text-xl">OTHERS</h1>
              <Separator className="my-4" />
              <div className="md:grid md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <div>
                      <Label>Tags</Label>
                      <MultiSelect
                        className="max-w-[250px] "
                        options={options}
                        // value={field.value.map((value) => ({
                        //   label: value,
                        //   value: value,
                        // }))}
                        // // onChange={(selected:string) => {
                        // //   // Transform selected options to an array of strings
                        // //   const selectedValues = selected.map((item:any) => item.value);
                        // //   // Trigger field-level onChange
                        // //   field.onChange(selectedValues);
                        // // }}
                        // onChange={(selected: any[]) => {
                        //   // Trigger field-level onChange directly with the selected values
                        //   field.onChange(selected);
                        // }}
                        value={field.value.map((value) => ({
                          label: value,
                          value,
                        }))}
                        onChange={(selected: any[]) => {
                          // Transform selected options to an array of strings
                          const selectedValues = selected.map(
                            (item) => item.value
                          );
                          // Trigger field-level onChange
                          field.onChange(selectedValues);
                        }}
                        labelledBy="Select"
                      />
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Label htmlFor="difficulty">Difficulty</Label>
                      </FormLabel>
                      <FormControl>
                        <Select_shad
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select_shad>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="col-span-3">
              <Button className="" type="submit" disabled={loading}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddQuestion;
