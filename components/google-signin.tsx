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
    const response = await signIn("google", {
      callbackUrl: callbackUrl ?? "/dashboard",
      redirect: false,
    });

    if (response?.error) {
      toast.error("Something went wrong");
      window.location.replace("/");
    }
    if (error === "AccessDenied") {
      window.location.replace("/");

      toast.error("Access Denied");
    }

    
    try {
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
