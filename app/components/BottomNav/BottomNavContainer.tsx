"use client";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useState } from "react";

const BottomNav = ({ children }: { children: React.ReactNode }) => {
  const [headerStyle, setHeaderStyle] = useState({
    transition: "all 200ms ease-in",
  });

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isVisible = currPos.y > prevPos.y;

      const shouldBeStyle = {
        visibility: isVisible ? "visible" : "hidden",
        transition: `all 200ms ${isVisible ? "ease-in" : "ease-out"}`,
        transform: isVisible ? "translate(-50%,0)" : "translate(-50%, 100%)",
      };

      if (JSON.stringify(shouldBeStyle) === JSON.stringify(headerStyle)) return;

      setHeaderStyle(shouldBeStyle);
    },
    [headerStyle]
  );
  return (
    <div
      className="fixed bottom-2 w-[96%] h-12 transform -translate-x-1/2 left-1/2 flex text-gray-600 max-w-screen-sm bg-[#f7f7f78c] dark:bg-[#1f1f1f8c] rounded-lg  backdrop-blur-md z-20"
      style={{ ...headerStyle }}
    >
      {children}
    </div>
  );
};

export default BottomNav;
