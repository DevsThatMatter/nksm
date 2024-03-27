import OrderHistoryTab from "@/app/components/OrderHistoryTab";
import { auth } from "@/auth";
import { User } from "next-auth";

const page = async () => {
  const userData = await auth();
  return (
    <main className="flex justify-center">
      <OrderHistoryTab email={userData?.user?.email!} />
    </main>
  );
};

export default page;
