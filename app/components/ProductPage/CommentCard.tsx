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
      <h2 className="text-lg font-semibold">Comments</h2>
      <ScrollArea className="h-72 w-full mt-2 rounded-md border p-2">
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Avatar>
              <AvatarImage
                alt="Kapana Naypore"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback>KN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Kapana Naypore</p>
              <div className="bg-gray-200 rounded-lg p-2">
                <p>Location can I see it and price negotiable?</p>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Avatar>
              <AvatarImage
                alt="Ms. Shreethi"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Ms. Shreethi</p>
              <div className="bg-gray-200 rounded-lg p-2">
                <p>
                  I am also looking for red, similar type. Is it in manual also?
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Avatar>
              <AvatarImage
                alt="Boben"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback>BO</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Boben</p>
              <div className="bg-gray-200 rounded-lg p-2">
                <p>Comment?</p>
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Avatar>
              <AvatarImage
                alt="Boben"
                src="/placeholder.svg?height=40&width=40"
              />
              <AvatarFallback>BO</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Boben</p>
              <p className="text-sm">Comment?</p>
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
