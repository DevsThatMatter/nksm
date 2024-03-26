"use client";
import {
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Form, FormControl, FormItem } from "../ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { sendEmail } from "@/lib/actions/email.actions";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";
import mongoose from "mongoose";

const OfferSchema = z.object({
  price: z.number().min(1, { message: "Zero values are not accepted" }),
});
interface OfferFormProps {
  reciverEmail: string;
  senderEmail: string;
  productImage: string;
  productId: mongoose.Types.ObjectId;
  productName: string;
}
export default function OfferForm({
  reciverEmail,
  senderEmail,
  productImage,
  productId,
  productName,
}: OfferFormProps) {
  const sendEmailWithDetails = (formData: FormData) =>
    sendEmail(
      senderEmail,
      reciverEmail,
      productName,
      productImage,
      productId,
      formData,
    );

  const form = useForm({
    resolver: zodResolver(OfferSchema),
    defaultValues: {
      price: 0,
    },
  });

  return (
    <Form {...form}>
      <form action={sendEmailWithDetails}>
        <CardTitle className="text-2xl">Enter Your Price</CardTitle>
        <CardDescription>Let us know your offer.</CardDescription>
        <CardContent className="space-y-2 p-4">
          <FormItem>
            <FormControl>
              <Input
                className="w-full"
                min="0"
                placeholder="How much are you willing to pay?"
                step="0.01"
                type="number"
                {...form.register("price")}
              />
            </FormControl>
          </FormItem>
        </CardContent>
        <CardFooter className="flex">
          <DialogClose>
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 dark:text-foreground"
            >
              Submit Offer
            </Button>
          </DialogClose>
        </CardFooter>
      </form>
    </Form>
  );
}
