import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import toast from "react-hot-toast";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  // secret: process.env.NEXTAUTH_SECRET,
  // session: {
  //   "strategy": "jwt"
  // },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",


    }),
    CredentialProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = { id: "1", role: "admin", email: "vanvihar@gmail.com", password: "1234567890" };
        const { email, password } = credentials as {
          email: string,
          password: string
        };

        if (email === user.email && password === user.password) {
          // Any object returned will be saved in `user` property of the JWT
          // return null;

          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          // toast.error('Invalid email or password')
          return null;



          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }

      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Do different verification for other providers that don't have `email_verified`
   
        if (account?.provider === "google" && profile?.email === "tanishq22@iiserb.ac.in") {
          return true
        }

        if(account?.provider === "credentials" && user){
          return true
        }

        return false
        

    
      }
    ,
  },

  //   async jwt(params: any) {
  //     return params.token
  //   },
  //   async session({ session, token }) {
  //     if (session.user) {
  //       (session.user as { id: string }).id = token.id as string;
  //     }
  //     return session
  //   }
  // },

  pages: {
    signIn: "/dashboard", //sigin page
    signOut: "/",
    error: "/",

  },
};