import { auth } from "@/auth";
import AccountComponent from "../../../components/Account/page";
import { User } from "@/lib/models/user.model";

export default async function MainAccountContainer() {
  const userData = (await auth())?.user;
  const userInfo = await User.find({ Email: userData?.email?.trim() });
  return (
    <div>
      <AccountComponent
        Name={userInfo[0].Name}
        Email={userInfo[0].Email}
        Phone={userInfo[0].Phone_Number}
        Avatar={userInfo[0].Avatar}
      />
    </div>
  );
}
