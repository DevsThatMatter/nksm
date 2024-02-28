import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/app/components/ui/avatar";
import React from "react";
import { Input } from "@/app/components/ui/input";

import { addComment, listComments } from "@/lib/actions/comment.actions";
import { redirect } from "next/navigation";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

async function CommentCard({ productId }: { productId: string }) {
  "use server";

  const userdata = await auth();

  const comments = await listComments(productId);
  const sendComment = async (formData: FormData) => {
    "use server";
    const comment = formData.get("content") as string;
    if (userdata != null && userdata != undefined && comment.trim() !== "") {
      const newcomment = {
        Product: new mongoose.Types.ObjectId(productId),
        User: new mongoose.Types.ObjectId(userdata?.user?.id),
        Comment: comment,
      };
      await addComment(newcomment);
      revalidatePath(`/product/${productId}`);
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
