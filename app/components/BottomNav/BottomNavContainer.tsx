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
    [headerStyle],
  );
  return (
    <div
      className="fixed bottom-2 left-1/2 z-20 flex h-12 w-[96%] max-w-screen-sm -translate-x-1/2 transform rounded-lg bg-[#f7f7f78c] text-gray-600  backdrop-blur-md dark:bg-[#1f1f1f8c]"
      style={{ ...headerStyle }}
    >
      {children}
    </div>
  );
};

export default BottomNav;
