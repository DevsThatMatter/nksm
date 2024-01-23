import Navbar from "@/app/ui/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen">
      <Navbar />
      {children}
      {/* TODO: remove this in actual production */}
      <div className="hidden top-[10%] left-[10%] top-[15%] top-[20%]"></div>
    </main>
  );
};
export default Layout;
