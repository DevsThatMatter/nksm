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
  data: Session | null;
  whichIcon?: Boolean;
}
export function Profile({ data, whichIcon }: UserProfileProps) {
  const { setTheme } = useTheme();
  const router = useRouter();
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };
  const handleLogin = () => {
    router.push("/login");
  };

  const handleAccountInfoClick = () => {
    router.push("/account");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-[1.7rem] w-[1.7rem] rounded-full outline-none focus-visible:outline-none focus-visible:ring-0"
        >
          <Avatar className="h-[2.1rem] w-[2.1rem] rounded-full">
            <AvatarImage
              src={data?.user?.image!}
              alt={data?.user?.name?.slice(0, 2)}
            />
            <AvatarFallback className="bg-transparent">
              {whichIcon ? (
                <svg
                  className="w-8 fill-[#4B5563] p-1 dark:fill-gray-500"
                  viewBox="0 0 1024 1025"
                >
                  <path d="M1024 958q0 12-13.5 22T969 996.5t-57.5 12t-75.5 8.5t-80 4.5t-87.5 2.5t-81 1h-151l-81-1l-87.5-2.5l-80-4.5l-75.5-8.5l-57.5-12L13.5 980L0 958q2-88 110-155.5T384 713v-33q-52-23-90-65t-60-98.5t-32-121T192 256q0-64 25-114t69-80.5t101-46T512 0t125 15.5t101 46t69 80.5t25 114q0 350-192 426v31q166 22 274 89.5T1024 958z"></path>
                </svg>
              ) : (
                <Icons.avatar className="h-8 w-8 bg-muted p-[0.15rem]" />
              )}{" "}
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
            <DropdownMenuItem onClick={handleAccountInfoClick}>
              Account Info
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenu>
          <DropdownMenuItem>
            <DropdownMenuTrigger className="border-none focus:border-none focus:outline-none  ">
              Change Theme
            </DropdownMenuTrigger>
          </DropdownMenuItem>
          <DropdownMenuContent align="center">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
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
