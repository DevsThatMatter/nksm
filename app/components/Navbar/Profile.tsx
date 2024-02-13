"use client";

import { useTheme } from "next-themes";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { Icons } from "@/app/utils/icons";
import { useRouter } from "next/navigation";

interface UserProfileProps {
  data?: Session | null;
}
export function UserProfile({ data }: UserProfileProps) {
  const { setTheme } = useTheme();
  const router = useRouter();
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };
  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-[1.7rem] w-[1.7rem] rounded-full">
          <Avatar className="h-[2.1rem] w-[2.1rem] rounded-full">
            <AvatarImage
              src={data?.user?.image!}
              alt={data?.user?.name?.trim()}
            />
            <AvatarFallback>
              <Icons.avatar className="h-[1.7rem] w-[1.7rem]" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {data?.user && (
          <>
            <DropdownMenuItem onClick={() => console.log("View Your Profile")}>
              View Your Orders
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Settings")}>
              Account Info
            </DropdownMenuItem>
          </>
        )}
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
        {!data?.user ? (
          <DropdownMenuItem onClick={handleLogin} className="text-blue-500">
            Login
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={handleLogout} className="text-red-500">
            Logout
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
