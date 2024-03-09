"use server";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/app/components/ui/avatar";
import React from "react";

import { addComment, listComments } from "@/lib/actions/comment.actions";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { Session } from "next-auth";
import CommentForm from "./CommentForm";

async function CommentCard({
  productId,
}: {
  productId: mongoose.Types.ObjectId;
}) {
  const userdata = await auth();
  const comments = await listComments(productId);
  return (
    <>
      <h2 className="mt-5 text-lg font-semibold">Comments</h2>
      <ScrollArea className="mt-2 h-72 w-full rounded-md border p-2">
        <div className="space-y-4">
          {comments?.length ? (
            comments.map((comment) => (
              <div
                className="flex items-start space-x-2"
                key={comment._id?.toString()}
              >
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
            <div>No Comments found!</div>
          )}
        </div>
      </ScrollArea>
      <CommentForm productId={productId.toString()} userdata={userdata} />
    </>
  );
}

export default CommentCard;
