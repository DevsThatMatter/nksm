"use client";
const BottomNav = ({ children }: { children: React.ReactNode }) => {
  console.log();
  return (
    <div className="fixed bottom-2 w-[96%] h-12 transform -translate-x-1/2 left-1/2 flex text-gray-600 max-w-screen-sm">
      {children}
    </div>
  );
};

export default BottomNav;
