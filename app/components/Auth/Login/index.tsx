"use client";

import { Button } from "../../ui/button";
import { CardWrapper } from "../card-wrapper";
import { FcGoogle } from 'react-icons/fc'
const LoginForm = () => {
  return <CardWrapper
    headerLabel="Welcome to NKSM!"
    backButtonLabel="Don't have an account?"
    backButtonHref="/signup"
  >
    <Button size="lg" className="w-full flex items-center justify-center space-x-3" variant='outline' onClick= {() => {}} >
      <FcGoogle className="h-6 w-6"/>
      <span>Continue with Google</span>
    </Button>
  </CardWrapper>;
};

export default LoginForm;
