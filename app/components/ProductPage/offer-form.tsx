"use client";
import { cn } from "@/app/utils";
import { sendEmail } from "@/lib/actions/email.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { Form, FormControl, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { DialogClose } from "@radix-ui/react-dialog";

interface OfferFormProps {
  reciverEmail: string;
  senderEmail: string;
  productImages: string[];
  productId: string;
  productName: string;
  is_negotiable: boolean;
  price: number;
  isLoggedIn: boolean;
}
export default function OfferForm({
  reciverEmail,
  senderEmail,
  productImages,
  productId,
  productName,
  is_negotiable,
  price,
  isLoggedIn,
}: OfferFormProps) {
  if (!isLoggedIn) {
    redirect("/login");
  }

  const OfferSchema = z.object({
    price: z.number().min(1, { message: "Zero values bids are not accepted" }),
  });

  const form = useForm({
    resolver: zodResolver(OfferSchema),
    defaultValues: {
      price: price,
    },
  });

  const sendEmailWithDetails = (formData: z.infer<typeof OfferSchema>) => {
    console.log(typeof formData.price);
    const prom = sendEmail(
      senderEmail,
      reciverEmail,
      productName,
      productImages,
      productId,
      formData,
    );
    toast.promise(prom, {
      loading: "Sending...",
      success: (data) => {
        return (
          <span className={cn(data.error ? "text-red-600" : "text-lime-800")}>
            {data.msg || data.error}
          </span>
        );
      },
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(sendEmailWithDetails)}>
        <CardTitle className="mb-5 text-2xl">
          {is_negotiable ? "Enter Your Price" : "Send an Offer"}
        </CardTitle>
        {is_negotiable && (
          <CardDescription className="mb-5">
            Let us know your offer.
          </CardDescription>
        )}
        <CardContent className="space-y-2 p-4">
          <FormItem>
            <FormControl>
              <Input
                className="w-full"
                min="0"
                placeholder="How much are you willing to pay?"
                step="0.1"
                type="number"
                disabled={!is_negotiable}
                {...form.register("price", { valueAsNumber: true })}
              />
            </FormControl>
            <div className="flex text-xs text-gray-500 dark:text-gray-400">
              {is_negotiable && (
                <p>{"Your bid will be submitted to the seller. "}</p>
              )}
              {!is_negotiable && (
                <p className="mt-4 text-yellow-500">
                  This price is not negotiable
                </p>
              )}
            </div>
            {form.formState.errors.price && (
              <FormMessage>{form.formState.errors.price.message}</FormMessage>
            )}
          </FormItem>
        </CardContent>
        <CardFooter className="flex">
          <DialogClose asChild>
            <Button
              type="submit"
              className="mt-5 w-full bg-green-600 hover:bg-green-700 dark:text-foreground"
            >
              Submit Offer
            </Button>
          </DialogClose>
        </CardFooter>
      </form>
    </Form>
  );
}
