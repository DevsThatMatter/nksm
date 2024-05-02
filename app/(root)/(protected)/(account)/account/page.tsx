import AccountTab from "@/app/components/AccountTab";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const userData = (await auth())?.user;
  if (!userData) {
    redirect("/");
  }

  return (
    <main className="mt-2 flex justify-center overflow-x-hidden">
      <AccountTab
        Name={userData?.name}
        Phone={userData?.id}
        Email={userData?.email}
        Avatar={userData?.image}
      />
    </main>
  );
};
export default page;
