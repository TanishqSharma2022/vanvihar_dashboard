// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { redirect, useRouter } from "next/navigation";

const Emails = ["tanishq22@iiserb.ac.in", "vanvihar@gmail.com", "sujit@iiserb.ac.in", "moonlab314@gmail.com", "vanviharwildlifeweek@gmail.com", "tanishqsharma.lko@gmail.com"]

export default withAuth(

    function middleware(req){

        // if(
        //     !Emails.includes(req.nextauth.token?.email ?? '')
        // ){
        //     return NextResponse.rewrite(new URL('/', req.url))
        // }

    },
   { 
        callbacks:{
            
            // authorized: ({token}) => token?.email === "tanishq22@iiserb.ac.in" 
            authorized: ({token}) => Emails.includes(token?.email ?? '')

        }
    }
)


// export { default } from "next-auth/middleware"
export const config = { matcher: ["/dashboard/:path*"] };
