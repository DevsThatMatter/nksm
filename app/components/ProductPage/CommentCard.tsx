import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/app/components/ui/avatar";
import React from "react";
import { Input } from "../ui/input";

function CommentCard() {
  return (
    <>
      <h2 className="text-lg font-semibold mt-5">Comments</h2>
      <ScrollArea className="h-72 w-full mt-2 rounded-md border p-2">
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Avatar>
              <AvatarImage
                alt="Alice"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Alice</p>
              <p className="text-sm">
                What are the available sizes for this product?
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Avatar>
              <AvatarImage
                alt="Charlie"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback>CH</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Charlie</p>
              <p className="text-sm">
                Is this product available in other colors?
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Avatar>
              <AvatarImage
                alt="David"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback>DA</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">David</p>
              <p className="text-sm">Can this product be customized?</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Avatar>
              <AvatarImage
                alt="Ian"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback>IA</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Ian</p>
              <p className="text-sm">
                Is this product suitable for outdoor use? Because my garden
                gnomes need some new friends.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Avatar>
              <AvatarImage
                alt="Eva"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback>EV</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Eva</p>
              <p className="text-sm">What is the material of this product?</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Avatar>
              <AvatarImage
                alt="Fiona"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback>FI</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Fiona</p>
              <p className="text-sm">
                What is the warranty period for this product? My pet hamster has
                a habit of &apos;testing&apos; things out.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Avatar>
              <AvatarImage
                alt="George"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback>GE</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">George</p>
              <p className="text-sm">
                Does this product require assembly? I once spent a whole day
                assembling a puzzle only to find out it was a pizza box.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Avatar>
              <AvatarImage
                alt="Hannah"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback>HA</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Hannah</p>
              <p className="text-sm">
                What are the care instructions for this product? I promise not
                to use it as a hat for my cat again.
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
      <Input
        className="w-full p-2 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-gray-300 dark:border-gray-800 dark:focus:ring-gray-600"
        id="comment-input"
        placeholder="Ask about the product..."
      />
    </>
  );
}

export default CommentCard;
