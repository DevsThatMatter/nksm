import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const AuthUtil = async () => {
  const userData = await auth();
  if (!userData) {
    redirect("/login");
  }
  return null;
};
