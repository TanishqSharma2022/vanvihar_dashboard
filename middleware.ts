// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";
export const config = { matcher: ["/dashboard/:path*"] };

// export function middleware(request: NextRequest) {
//     return NextResponse.redirect(new URL('/dashboard', request.url))
//   }