"use client"
import { Button } from "@/components/ui/button"
import {ColumnDef} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Questions = {
    _id: string,
    question: string, 
    answer: string,
    difficulty: string,
    answerType: string,
    answerChoices: string[],
    tags: string[],
    hasAttachment: boolean,
    attachment: string,
    createdAt: string,
    updatedAt: string,
    answerDescription: string,
    descriptionAttachment: string,
    attempts: number,
    correctAttempts: number,

}


export const columns: ColumnDef<Questions>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const question = row.original

      return (
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
            <DropdownMenuItem>Update Question</DropdownMenuItem>
            <DropdownMenuItem>Delete Question</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
    {
        accessorKey: '_id',
        header: 'Id',
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Created At
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    
    {
        accessorKey: 'question',
        header: 'Question',
    },
    {
        accessorKey: 'attempts',
        header: 'Total Attempts',
    },
    {
        accessorKey: 'correctAttempts',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Correct Attempts
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    
    {
        accessorKey: 'correctAnswer',
        header: 'Answer',
    },{
        accessorKey: 'difficulty',
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Difficulty
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },{
        accessorKey: 'answerType',
        header: 'Option Type',
    },{
        accessorKey: 'answerChoices',
        header: 'Options',
    },{
        accessorKey: 'tags',
        header: 'Tags',
    },{
        accessorKey: 'hasAttachment',
        header: 'Attachment',
    },{
        accessorKey: 'answerDescription',
        header: 'Answer Description',
    },{
        accessorKey: 'descriptionAttachment',
        header: 'Description Attachment',
    },{
        accessorKey: 'updatedAt',
        header: 'Updated At',
    }
]

