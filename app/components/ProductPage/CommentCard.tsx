"use server";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/app/components/ui/avatar";
import React from "react";

import { listComments } from "@/lib/actions/comment.actions";
import mongoose from "mongoose";
import { auth } from "@/auth";
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
      <h2 className="mt-6 pb-3 text-2xl font-semibold lg:mt-3 lg:pb-0 lg:text-xl">
        Comments
      </h2>
      <ScrollArea className="mt-2 flex h-72 w-full rounded-md border px-2">
        {comments?.length ? (
          comments.map((comment) => (
            <div
              className="flex items-start space-x-2 py-2"
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
          <div className="grid h-[15rem] place-content-center px-4">
            <div className="text-center">
              <h2 className="mt-6 text-xl font-bold tracking-tight text-foreground sm:text-3xl">
                Its Quiet Here!
              </h2>
              <p className="mt-4 text-muted-foreground">
                Be the first to start the conversation.
              </p>
            </div>
          </div>
        )}
      </ScrollArea>
      <CommentForm productId={productId.toString()} userdata={userdata} />
    </>
  );
}

export default CommentCard;
