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
      const amount = parseFloat(row.getValue("timeTaken"))
      const seconds = amount/1000
      if(seconds > 60){
        const minutes = seconds/60
        const second = seconds%60
        const formatted = `${minutes.toFixed(0)} m ${second.toFixed(0)} s`
        return <div className="text-right font-medium">{formatted}</div>
        
      }
      const formatted = `${seconds.toFixed(0)} s`
 
      return <div className="text-right font-medium">{formatted}</div>
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
