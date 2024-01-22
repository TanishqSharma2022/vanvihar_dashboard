"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import DeleteQuestion from "@/components/actions/deleteQuestion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";

export type Questions = {
  _id: string;
  question: string;
  answer: string;
  difficulty: string;
  answerType: string;
  answerChoices: string[];
  tags: string[];
  hasAttachment: boolean;
  attachment: string;
  createdAt: string;
  updatedAt: string;
  answerDescription: string;
  descriptionAttachment: string;
  attempts: number;
  correctAttempts: number;
};

export const columns: ColumnDef<Questions>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const question = row.original;

      const deleteQuestion = async () => {
        console.log("deleted");
        try {
          const response = await fetch(
            `https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizQuestion/deleteQuestion?id=${question._id}`,
            {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
              },
            }
          );
        } catch (error) {
          console.error("Error deleting question:", error);
          toast.error("Error Deleting the Question");
        } finally {
          toast.success("Question updated successfully...");
          window.location.reload();
        }
      };
      return (
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(question._id)}
              >
                Copy Question ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href={`questions/update/${question._id}`}
                  className="flex items-center"
                >
                  <Edit className="mr-2 h-4 w-4" /> Update Question
                </Link>
              </DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>
                  {/* <DeleteQuestion /> */}
                  <Trash className="mr-2 h-4 w-4" /> Delete Question
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you absolutely sure to delete the question?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                question and remove the data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600"
                onClick={deleteQuestion}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "question",
    header: "Question",
  },
  {
    accessorKey: "attempts",
    header: "Total Attempts",
  },
  {
    accessorKey: "correctAttempts",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Correct Attempts
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "correctAnswer",
    header: "Answer",
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Difficulty
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "answerType",
    header: "Option Type",
  },
  
  {
    accessorKey: "tags",
    header: "Tags",
  },
  {
    accessorKey: "hasAttachment",
    header: "Attachment",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
  
  {
    accessorKey: "answerDescription",
    header: "Answer Description",
  },
  {
    accessorKey: "descriptionAttachment",
    header: "Description Attachment",
  },
  {
    accessorKey: "answerChoices",
    header: "Options",
  },
  
];
