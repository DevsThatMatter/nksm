import AccountTab from "@/app/components/AccountTab";
import { auth } from "@/auth";
import { User } from "@/lib/models/user.model";

const page = async () => {
  const userData = (await auth())?.user;
  const userInfo = await User.find({ Email: userData?.email?.trim() });

  console.log(userInfo);

  return (
    <main className="mt-8 flex justify-center overflow-x-hidden">
      <AccountTab
        Name={userInfo[0].Name}
        Phone={userInfo[0].Phone_Number}
        Email={userInfo[0].Email}
        Avatar={userInfo[0].Avatar}
      />
    </main>
  );
};
export default page;
