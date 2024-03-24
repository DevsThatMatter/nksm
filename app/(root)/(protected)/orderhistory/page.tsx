"use client";
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
import OrderHistoryTab from "@/app/components/OrderHistoryTab";

export default function Component() {
  return (
    <div className="h-full w-full rounded-lg p-8 shadow">
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
              prefetch
              aria-current="page"
              className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              href="/account"
            >
              Account Info
            </Link>
            <Link
              prefetch
              className="whitespace-nowrap border-b-2 border-blue-500 px-1 py-4 text-sm font-medium text-blue-600"
              href="#"
            >
              Order History
            </Link>
            <Link
              prefetch
              className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              href="/wishlist"
            >
              Wishlist
            </Link>
          </nav>
        </div>
        <div className="pt-3">
          <OrderHistoryTab />
          <OrderHistoryTab />
        </div>
      </Tabs>
    </div>
  );
}
