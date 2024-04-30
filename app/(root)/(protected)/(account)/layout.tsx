import ActiveLinks from "./links";
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full overflow-x-hidden rounded-lg p-2">
      <div className="border-b">
        <ActiveLinks />
      </div>
      {children}
    </div>
  );
}
