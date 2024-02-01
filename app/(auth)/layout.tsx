const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-600  to-cyan-100 h-full flex items-center justify-center">{children}</main>;
};
export default Layout;
