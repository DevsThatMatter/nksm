"use client";
import { AvatarImage, AvatarFallback, Avatar } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "../components/ui/card";
import { Tabs } from "../components/ui/tabs";
import PencilIcon from "../components/ui/PencilIcon";
import Link from "next/link";
import { useState } from "react";

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
                onClick={() => {}}
              >
                Account Info
              </Link>
              <Link
                className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                href="/orderhistory"
                onClick={() => {}}
              >
                Order History
              </Link>
              <a
                className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                href="/wishlist"
                onClick={() => {}}
              >
                Wishlist
              </a>
            </nav>
          </div>
          <div className="mt-6 pt-4">
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
                <Avatar>
                  <AvatarImage alt="Profile picture" src="/temporaryfotu.svg" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <Button
                  className="ml-0 mt-1 sm:ml-4 sm:mt-0"
                  variant="secondary"
                  onClick={() => {}}
                >
                  Change
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="mt-4 flex items-center justify-center gap-4 sm:mt-0 sm:justify-start sm:gap-2">
                  <Input
                    className="w-1/3"
                    placeholder="First Name"
                    type="text"
                  />
                  <Input
                    className="w-1/3 sm:ml-5"
                    placeholder="Last Name"
                    type="text"
                  />
                  <PencilIcon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-center px-14 sm:justify-start sm:px-0">
                  <Input
                    className="w-3/4 sm:w-1/3"
                    placeholder="Email"
                    type="email"
                  />
                  <PencilIcon className="ml-2 h-5 w-5 text-gray-400" />
                </div>
                <div className="flex items-center justify-center px-14 sm:justify-start sm:px-0">
                  <Input
                    className="w-3/4 sm:w-1/3"
                    placeholder="Phone number"
                    type="tel"
                  />
                  <PencilIcon className="ml-2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
