import Navbar from "@/app/components/Navbar/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen">
      <Navbar />
      {children}
    </main>
  );
};
export default Layout;
