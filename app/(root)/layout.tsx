import Navbar from "@/app/components/Navbar";
import getIsSsrMobile from "../components/mobile-detect";
import BottomNav from "../components/BottomNav";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const mobnav = getIsSsrMobile();
  return (
    <main className="min-h-screen bg-background">
      {mobnav ? (
        <>
          <Navbar>
            <></>
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
