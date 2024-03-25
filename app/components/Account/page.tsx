"use client";
import { Tabs } from "@/app/components/ui/tabs";

import AccountTab from "@/app/components/AccountTab";
import { auth } from "@/auth";
import { User } from "@/lib/models/user.model";
import { useState } from "react";
import OrderHistoryTab from "../OrderHistoryTab";
import WishlistTab from "../WishlistTab";

export default function AccountComponent({ ...props }) {
  const [activeTab, setActiveTab] = useState("account");
  console.log(props);
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
              <button
                aria-current="page"
                className={`whitespace-nowrap border-b-2 ${activeTab === "account" ? "border-blue-500  text-blue-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} px-1 py-4 text-sm font-medium`}
                onClick={() => setActiveTab((activeTab) => "account")}
              >
                Account Info
              </button>
              <button
                className={`whitespace-nowrap border-b-2 ${activeTab === "orderhistory" ? "border-blue-500  text-blue-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} px-1 py-4 text-sm font-medium`}
                onClick={() => setActiveTab((activeTab) => "orderhistory")}
              >
                Order History
              </button>
              <button
                className={`whitespace-nowrap border-b-2 ${activeTab === "wishlist" ? "border-blue-500  text-blue-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} px-1 py-4 text-sm font-medium`}
                onClick={() => setActiveTab((activeTab) => "wishlist")}
              >
                Wishlist
              </button>
            </nav>
          </div>

          {activeTab === "account" ? (
            <div className="flex justify-center">
              <AccountTab
                Name={props.Name}
                Email={props.Email}
                Phone={props.Phone}
                Avatar={props.Avatar}
              />
            </div>
          ) : activeTab === "orderhistory" ? (
            <div>
              <OrderHistoryTab />
            </div>
          ) : (
            activeTab === "wishlist" && (
              <div className="mt-6 pt-4">
                <WishlistTab />
              </div>
            )
          )}
        </Tabs>
      </div>
    </div>
  );
}
