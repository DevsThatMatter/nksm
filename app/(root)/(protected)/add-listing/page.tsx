import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function page() {
  const userData = await auth();
  if (!userData) {
    redirect("/login");
  }
  redirect("/");
}

export default page;
