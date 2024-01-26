// GoogleSignInButton.js
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const error = searchParams.get("error");
  const [loading, setLoading] = useState(false);

  async function GoogleSignIn() {
    try{
      const response = await signIn("google", {
      callbackUrl: callbackUrl ?? "/dashboard",
    });
  

    

    // if (error === "AccessDenied") {
    //   window.location.replace("/");

    //   toast.error("Access Denied");
    // }
    if (!response) {
      console.error("Google sign-in failed");
      // Handle the error or show a message to the user
    } else {
      // Successful sign-in, response contains session information
      console.log("Google sign-in successful", response);
      toast.success("Sign in successful.");
      // Optionally, you can redirect to the dashboard or handle the success as needed
    }
    
    
      setLoading(true);
      
 } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      className="w-full text-[#214D3C] hover:bg-[#d4f7e5]/70"
      variant="outline"
      type="button"
      disabled={loading}
      onClick={GoogleSignIn}
    >
      <FaGoogle className="mr-2 h-4 w-4" color="#214D3C" />
      Continue with Google
    </Button>
  );
}
