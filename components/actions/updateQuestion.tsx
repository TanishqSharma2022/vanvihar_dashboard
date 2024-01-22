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
import {
  Select_shad,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MultiSelect } from "react-multi-select-component";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { options } from "@/constants/data";

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
  answerType: z.string().default(""),
  difficulty: z.string().default(""),
  tags: z.array(z.string()),
});

interface Question {
  question: string;
  correctAnswer: string;
  answerChoices: string[];
  hasAttachment: boolean;
  attachmentType: string;
  descriptionAttachment: string;
  attachment: string;
  answerDescription: string;
  answerType: string;
  difficulty: string;
  tags: string[];
}

function UpdateQuestion({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [ques, setQues] = useState<Question>({
    question: "",
    correctAnswer: "",
    answerChoices: [""],
    hasAttachment: false,
    attachmentType: "",
    descriptionAttachment: "",
    attachment: "",
    answerDescription: "",
    answerType: "",
    difficulty: "",
    tags: [""],
  });
  useEffect(() => {
    async function getQuestion() {
      try {
        const response = await fetch(
          `https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizQuestion/getQuestionById?id=${params.id}`
        );

        const data = await response.json();
        setQues(data.data);

        const defaultValues = {
          question: data.data.question || "",
          correctAnswer: data.data.correctAnswer || "",
          answerChoices: data.data.answerChoices || [],
          hasAttachment: data.data.hasAttachment || false,
          attachmentType: data.data.attachmentType || "",
          descriptionAttachment: data.data.descriptionAttachment || "",
          attachment: data.data.attachment || "",
          answerDescription: data.data.answerDescription || "",
          answerType: data.data.answerType || "",
          difficulty: data.data.difficulty || "",
          tags: data.data.tags || [],
        };

        form.reset(defaultValues);
      } catch (error) {
        console.error("Error fetching question information:", error);
        toast.error("Error Uploading Question");
      }
    }
    getQuestion();
  }, [params.id, form]);

  const [hasAttachment, setHasAttachment] = React.useState(false);
  const [isText, setIsText] = React.useState(true)
  const router = useRouter();
    
  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizQuestion/updateQuestion?id=${params.id}`,
        {
          method: "PATCH",
          
          body: JSON.stringify({"data":{
            question: values.question,
            correctAnswer: values.correctAnswer,
            answerChoices: values.answerChoices,
            hasAttachment: values.hasAttachment,
            attachmentType: values.attachmentType,
            descriptionAttachment: values.descriptionAttachment,
            attachment: values.attachment,
            answerType: values.answerType,
            answerDescription: values.answerDescription,
            difficulty: values.difficulty,
            tags: values.tags,
          }}),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Error Uploading Question");
    } finally {
      setLoading(false);
      toast.success("Question updated successfully...");
    //   window.location.reload();
      router.push("/dashboard/questions");
    }
  };

  return (
    <div className="p-4 h-full  md:px-12">
      <div className="w-full h-full  ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" h-full ">
            {/* QUESTION SECTION */}
            <div className="w-full py-4">
              <h1 className="font-bold text-xl">QUESTION</h1>
              <Separator className="my-4" />

              <div className="flex  gap-6">
                <div className="grid grid-cols-1 ">
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
                          <Input placeholder="Question" {...field} />
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
                              <SelectItem value="image" >Image</SelectItem>
                              <SelectItem value="text" >Text</SelectItem>
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
                  {[0, 1, 2, 3].map((index) => (
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
                            onChange={(value) => field.onChange(value)}
                          />
                        </div>
                      )}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-6 ">
                  {/* CORRECT ANSWER */}
                  <FormField
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
                  />

                  {/* ATTACHMENTS */}
                  <div className="grid gap-3">
                    
                   {!isText &&  
                   <>
                   as
                    {/* <FormField
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
                            <Label htmlFor="question" className="px-4">
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
                                  Answer Image Link
                                </Label>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Answer Image URL"
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
                    )} */}
                    </>
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* ANSWER SECTION */}
            <div className="w-full py-8 ">
              <h1 className="font-bold text-xl">ANSWER</h1>
              <Separator className="my-4" />
              <div className="md:grid md:grid-cols-3 gap-6">
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
                        <Input placeholder="Image URL" {...field} />
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
            <div className="w-full py-8">
              <h1 className="font-bold text-xl">OTHERS</h1>
              <Separator className="my-4" />
              <div className="md:grid md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <div>
                      <Label>Tags</Label>
                      {/* <MultiSelect
                        options={options}
                        value={(field.value || []).map((value) => ({
                          label: value,
                          value: value,
                        }))}
                        // onChange={(selected: string[]) => {
                        //     const selectedValues = selected.map((item) => console.log(item));
                        //     field.onChange(selectedValues);
                        //   }}
                        onChange={(selected: string[]) => {
                          // Trigger field-level onChange directly with the selected values
                          field.onChange(selected);
                        }}
                        labelledBy="Select"
                      /> */}
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
                Update Question
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default UpdateQuestion;
