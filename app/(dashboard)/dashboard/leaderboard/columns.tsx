import { ColumnDef } from "@tanstack/react-table";

export type LeaderBoard = {
  id: string;
  uid: string;
  name: string;
  email: string;
  score: number;
  timeTaken: number;
  displayPicture: string;
};

export const columns: ColumnDef<LeaderBoard>[] = [
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "timeTaken",
    header: "Time Taken",
  },
  {
    accessorKey: "displayPicture",
    header: "Display Picture",
  },
];
