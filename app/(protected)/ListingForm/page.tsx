import { auth } from "@/auth";
import AddListingForm from "../../components/AddListing/Form";
import { redirect } from "next/dist/server/api-utils";

async function page() {
  return <AddListingForm />;
}

export default page;
