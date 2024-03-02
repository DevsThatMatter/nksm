"use client";

import { CardWrapper } from "@/app/components/Auth/card-wrapper";
import { Button } from "@/app/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const ErrorPage = () => {
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
    <CardWrapper headerLabel="An Error Occured! Did you sign in using your domain(.nitkkr.ac.in) ID?">
      <Button
        size="lg"
        className="flex w-full items-center justify-center space-x-3"
        variant="outline"
        onClick={handleSignin}
      >
        <FcGoogle className="h-6 w-6" />
        <span>Retry with your Domain ID</span>
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

export default ErrorPage;
