import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/app/components/ui/card";
import { Tabs } from "@/app/components/ui/tabs";
import PencilIcon from "@/app/components/ui/PencilIcon";
import Link from "next/link";

import AccountTab from "@/app/components/AccountTab";

export default function Component() {
  return (
    <div className="h-screen w-screen">
      <div className="w-full rounded-lg p-8 shadow ">
        <h1 className="mb-4 text-center text-2xl font-bold sm:text-left">
          My Account
        </h1>
        <Tabs>
          <div className="mt-8 border-b">
            <nav
              aria-label="Tabs"
              className="-mb-px flex justify-center space-x-8 text-center sm:justify-start"
            >
              <Link
                aria-current="page"
                className="whitespace-nowrap border-b-2 border-blue-500 px-1 py-4 text-sm font-medium text-blue-600"
                href=""
              >
                Account Info
              </Link>
              <Link
                className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                href="/orderhistory"
              >
                Order History
              </Link>
              <Link
                className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                href="/wishlist"
              >
                Wishlist
              </Link>
            </nav>
          </div>
          <div className="mt-6 pt-4">
            <AccountTab />
          </div>
        </Tabs>
      </div>
    </div>
  );
}
