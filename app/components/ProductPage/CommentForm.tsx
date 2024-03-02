"use client";
import React, { useRef } from "react";
import { Input } from "../ui/input";
import { sendComment } from "@/lib/actions/comment.actions";
import { Session } from "next-auth";
import mongoose from "mongoose";

function CommentForm({
  userdata,
  productId,
}: {
  userdata: Session | null;
  productId: string;
}) {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        ref.current?.reset();
        await sendComment(formData, userdata, productId);
      }}
    >
      <Input
        className="w-full rounded-md border p-2 focus-visible:outline-none focus-visible:ring-0"
        id="comment-input"
        placeholder="Ask about the product"
        name="content"
        required
      />
    </form>
  );
}

export default CommentForm;
