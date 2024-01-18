import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session:{
    "strategy": "jwt"
  },
  providers: [
    CredentialProvider({
    //     name: "Credentials",
    // // `credentials` is used to generate a form on the sign in page.
    // // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // // e.g. domain, username, password, 2FA token, etc.
    // // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Email", type: "text", placeholder: "Email" },
      password: { label: "Password", type: "password" }
    },
      // credentials: {
      //   email: {
      //     label: "email",
      //     type: "email",
      //     placeholder: "example@gmail.com",
      //   },
      // },
      async authorize(credentials, req) {
        const user = { id: "1", role: "admin", email: credentials?.email, password: "1234567" };
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],

  callbacks:{
    jwt(params:any){
      return params.token
    }, 
    session({session, token}){
      if(session.user){
        (session.user as {id: string}).id = token.id as string;
      }
      return session
    }
  },

  pages: {
    signIn: "/", //sigin page
  },
};