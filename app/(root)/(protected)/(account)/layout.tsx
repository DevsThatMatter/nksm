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
      {/* {activeTab === "account" ? (
          <div className="mt-8 flex justify-center">
            <AccountTab
              Name={props.Name}
              Email={props.Email}
              Phone={props.Phone}
              Avatar={props.Avatar}
            />
          </div>
        ) : activeTab === "orderhistory" ? (
          <div>
            <Suspense fallback="Loading...">
              <OrderHistoryTab />
            </Suspense>
          </div>
        ) : (
          activeTab === "wishlist" && (
            <div className="mt-8">
              <WishlistTab />
            </div>
          )
        )} */}
    </div>
  );
}
