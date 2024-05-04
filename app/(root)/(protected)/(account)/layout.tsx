import ActiveLinks from "./links";
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full overflow-x-hidden rounded-lg p-2">
      <div className="border-b">
        <ActiveLinks
          defaultClassName="whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
          activeClassName="border-blue-500  text-blue-600"
          inactiveClassName="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        />
      </div>
      {children}
    </div>
  );
}
