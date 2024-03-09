import { auth } from "@/auth";
import { Profile } from "./Profile";

export default async function UserProfile({
  whichIcon,
}: {
  whichIcon?: boolean;
}) {
  const userData = await auth();
  return <Profile data={userData} whichIcon={whichIcon} />;
}
