const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-full min-h-screen  items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-600 to-cyan-100">
      {children}
    </main>
  );
};
export default Layout;
