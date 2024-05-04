import OrdersTab from "@/app/components/OrdersTab";
import { auth } from "@/auth";
import { User } from "next-auth";

const page = async () => {
  const userData = await auth();
  return (
    <main className=" flex h-[80vh] justify-center overflow-x-hidden">
      <OrdersTab email={userData?.user?.email!} />
    </main>
  );
};

export default page;
