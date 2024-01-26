import { ColumnDef } from "@tanstack/react-table";

export type LeaderBoard = {
  id: string;
  uid: string;
  name: string;
  email: string;
  score: number;
  timeTaken: number;
  displayPicture: string;
  createdAt: string,
  playerType: string
};




export const columns: ColumnDef<LeaderBoard>[] = [

  {
    accessorKey: "createdAt",
    header: "Date Time",
    cell: ({ row }) => {
      const formatted = `${extractDate(row.original.createdAt)} ${extractTime(row.original.createdAt)}`;
      return <div className="text-right font-medium">{formatted}</div>;

    },
  },
  {
    accessorKey: "playerType",
    header: "Player Type",
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
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("timeTaken"));
const seconds = amount / 1000;

if (seconds > 60) {
  const minutes = Math.floor(seconds / 60); // Use Math.floor to get the integer part
  const remainingSeconds = Math.floor(seconds % 60); // Corrected part
  const formatted = `${minutes.toFixed(0)} m ${remainingSeconds.toFixed(0)} s`;
  return <div className="text-right font-medium">{formatted}</div>;
}

const formatted = `${seconds.toFixed(0)} s`;
return <div className="text-right font-medium">{formatted}</div>;

    },
  },
  {
    accessorKey: "displayPicture",
    header: "Display Picture",
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium flex items-center  ">
          <img
            src={row.original.displayPicture}
            alt={row.original.displayPicture}
            className="w-8 h-8 rounded-full object-cover shadow-lg"
          />
        </div>
      );
    },
  
  },
];




function extractDate(dateTimeString:any) {
  const dateTime = new Date(dateTimeString);

  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; // Month is zero-based, so add 1
  const day = dateTime.getDate();

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

function extractTime(dateTimeString:string) {
  const dateTime = new Date(dateTimeString);
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();

  return `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}