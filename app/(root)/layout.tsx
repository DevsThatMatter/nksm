import Navbar from "@/app/ui/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen">
      <Navbar />
      {children}
      {/* TODO: remove this in actual production */}
      <div className="hidden pl-3 object-top  top-[20%] top-[10%] left-[10%] top-[15%] top-[20%] right-1/4 inset-0 m-auto right-0 left-0 mx-auto left-1/4 lg:row-span-2 lg:col-span-2 lg:row-span-3  lg:row-span-2 lg:row-span-2 object-right-top object-left-top inset-0"></div>
    </main>
  );
};
export default Layout;
