import { Tabs } from "@/app/components/ui/tabs";

import AccountTab from "@/app/components/AccountTab";
import { auth } from "@/auth";
import { User } from "@/lib/models/user.model";
import { Suspense, useState } from "react";
import ActiveLinks from "./links";
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-lg p-8 shadow ">
      <h1 className="mb-4 text-center text-2xl font-bold sm:text-left">
        My Account
      </h1>

      <div className="mt-8 border-b">
        <ActiveLinks />
      </div>
      {children}
    </div>
  );
}
