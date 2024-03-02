import { auth } from "@/auth";
import AddListingForm from "../../../components/AddListing/Form";
import { redirect } from "next/navigation";

async function page() {
  const userData = await auth();
  if (!userData) {
    redirect("/login");
  }
  return <AddListingForm userData={userData}/>;
}

export default page;
