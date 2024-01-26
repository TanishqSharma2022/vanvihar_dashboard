import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import toast from "react-hot-toast";
import GoogleProvider from "next-auth/providers/google";


const allowedEmails = ["tanishq22@iiserb.ac.in", "vanvihar@gmail.com", "sujit@iiserb.ac.in", "moonlab314@gmail.com", "vanviharwildlifeweek@gmail.com", "tanishqsharma.lko@gmail.com"]


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
      // profile(profile) {
      //   if (profile?.email === "tanishq22@iiserb.ac.in" ) {
      //     return {
      //       ...profile,
      //       id: profile.sub as string,
      //       email: profile.email as string,
      //       image: profile.picture as string,
      //       name: profile.name as string,
      //     };
      //   }
      // }

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
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        return allowedEmails.includes(profile.email);
      }

      // For other providers or credentials, allow sign-in
      return !!user;
    },
  
async redirect({ url, baseUrl }) {
  if (url === "/api/auth/signin") {
    return baseUrl + "/dashboard";
  }
  return baseUrl
},



    async jwt({token, user}) {
      if (user) {
        token.id = user.id;
      }
      return token;

      } ,
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
      }
      return session
    }
  },

  pages: {
    signIn: "/dashboard", //sigin page
    signOut: "/",
    error: "/",

  },
  
};




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
