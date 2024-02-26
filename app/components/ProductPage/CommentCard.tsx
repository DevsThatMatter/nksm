import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/app/components/ui/avatar";
import React from "react";
import { Input } from "../ui/input";
import { CommentsInterface, CommentsType } from "@/types";
import { addComment } from "@/lib/actions/comment.actions";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import mongoose, { mongo } from "mongoose";

function CommentCard({
  comments,
  productId,
  userdata,
}: {
  comments: CommentsType;
  productId: string;
  userdata: Session | null;
}) {
  const sendComment = async (formData: FormData) => {
    "use server";

    const comment = formData.get("content") as string;
    if (comment.trim() !== "" && userdata?.user) {
      const newcomment: CommentsInterface = {
        Product: new mongo.ObjectId(productId),
        User: new mongo.ObjectId(userdata.user.id),
        Comment: comment,
      };
      await addComment(newcomment);
    } else {
      redirect("/login");
    }
  };

  return (
    <>
      <h2 className="mt-5 text-lg font-semibold">Comments</h2>
      <ScrollArea className="mt-2 h-72 w-full rounded-md border p-2">
        <div className="space-y-4">
          {comments ? (
            comments.map((comment) => (
              <div className="flex items-start space-x-2" key={comment._id}>
                <Avatar>
                  <AvatarImage
                    alt={comment.User.Name}
                    src={comment.User.Avatar}
                  />
                  <AvatarFallback>
                    {comment.User.Name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{comment.User.Name}</p>
                  <p className="text-sm">{comment.Comment}</p>
                </div>
              </div>
            ))
          ) : (
            <div>No Comments</div>
          )}
        </div>
      </ScrollArea>
      <form action={sendComment}>
        <Input
          className="w-full rounded-md border border-gray-200 p-2 focus:outline-none focus:ring focus:ring-gray-300 dark:border-gray-800 dark:focus:ring-gray-600"
          id="comment-input"
          placeholder="Ask about the product..."
          name="content"
          required
        />
      </form>
    </>
  );
}

export default CommentCard;
