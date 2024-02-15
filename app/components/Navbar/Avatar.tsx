"use client";

import { useTheme } from "next-themes";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Icons } from "@/app/utils/icons";

import { signOut } from "next-auth/react";

export function Avatar({
  children = (
    <Button variant="ghost" size="icon">
      <Icons.avatar className="h-[1.7rem] w-[1.7rem]" />
    </Button>
  ),
}: {
  children?: React.ReactNode;
}) {
  const { setTheme } = useTheme();
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-3">{children}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => console.log("View Your Profile")}>
          View Your Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Settings")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenu>
          <DropdownMenuItem>
            <DropdownMenuTrigger>Change Theme</DropdownMenuTrigger>
          </DropdownMenuItem>

          <DropdownMenuContent align="center">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenuItem onClick={handleLogout} className="text-red-500">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
