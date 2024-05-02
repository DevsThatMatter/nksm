import AccountTab from "@/app/components/AccountTab";
import { auth } from "@/auth";
import { User } from "@/lib/models/user.model";
import { redirect } from "next/navigation";

const page = async () => {
  const userData = (await auth())?.user;
  const userInfo = await User.find({ Email: userData?.email?.trim() });
  if (!userData) {
    redirect("/");
  }

  return (
    <main className="mt-2 flex justify-center overflow-x-hidden">
      <AccountTab
        Name={userInfo[0].Name}
        Email={userInfo[0].Email}
        Avatar={userInfo[0].Avatar}
      />
    </main>
  );
};
export default page;
