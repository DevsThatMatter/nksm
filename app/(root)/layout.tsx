import Navbar from "@/app/ui/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen">
      <Navbar />
      {children}
    </main>
  );
};
export default Layout;
