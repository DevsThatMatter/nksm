import { auth } from "@/auth";
import { Profile } from "./Profile";

export default async function UserProfile({
  children,
}: {
  children?: React.ReactNode;
}) {
  console.log("UserProfile");
  const userData = await auth();
  return <Profile data={userData} children={children} />;
}
