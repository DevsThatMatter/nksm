import Navbar from "@/app/components/Navbar";
import getIsSsrMobile from "../components/mobile-detect";
import BottomNav from "../components/BottomNav";
import Link from "next/link";
import Image from "next/image";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const mobnav = getIsSsrMobile();
  return (
    <main className="min-h-screen bg-background">
      {mobnav ? (
        <>
          <Navbar className="w-[100%] justify-between">
            <>
              <div className="h-[4.769rem] order-[-1]">
                <Link href="/">
                  <Image
                    src="/logon.svg"
                    alt="Logo"
                    width={150}
                    height={150}
                    className="dark:invert logo my-2 mt-3 "
                  />
                </Link>
              </div>
            </>
          </Navbar>
          <BottomNav />
        </>
      ) : (
        <Navbar />
      )}
      {children}
    </main>
  );
};
export default Layout;
