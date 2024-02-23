"use client";

import { Button } from "../../ui/button";
import { CardWrapper } from "../card-wrapper";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const handleSkipSignin = () => {
    router.push("/");
  };

  const handleSignin = async () => {
    signIn("google", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <CardWrapper headerLabel="Welcome to NKSM!">
      <Button
        size="lg"
        className="flex w-full items-center justify-center space-x-3"
        variant="outline"
        onClick={handleSignin}
      >
        <FcGoogle className="h-6 w-6" />
        <span>Continue with your Domain ID</span>
      </Button>
      <Button
        size="lg"
        className="mt-3 flex w-full items-center justify-center space-x-3"
        variant="ghost"
        onClick={handleSkipSignin}
      >
        <span>Sign in later</span>
      </Button>
    </CardWrapper>
  );
};

export default LoginForm;
