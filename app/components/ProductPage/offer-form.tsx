"use client";
import {
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Form, FormControl, FormItem, FormMessage } from "../ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { sendEmail } from "@/lib/actions/email.actions";
import { toast } from "sonner";
import { cn } from "@/app/utils";

const OfferSchema = z.object({
  price: z.number().min(1, { message: "Zero values bids are not accepted" }),
});
interface OfferFormProps {
  reciverEmail: string;
  senderEmail: string;
  productImages: string[];
  productId: string;
  productName: string;
}
export default function OfferForm({
  reciverEmail,
  senderEmail,
  productImages,
  productId,
  productName,
}: OfferFormProps) {
  const form = useForm({
    resolver: zodResolver(OfferSchema),
    defaultValues: {
      price: 1,
    },
  });

  const sendEmailWithDetails = (formData: z.infer<typeof OfferSchema>) => {
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
            {data.error || data.msg}
          </span>
        );
      },
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(sendEmailWithDetails)}>
        <CardTitle className="mb-5 text-2xl">Enter Your Price</CardTitle>
        <CardDescription className="mb-5">
          Let us know your offer.
        </CardDescription>
        <CardContent className="space-y-2 p-4">
          <FormItem>
            <FormControl>
              <Input
                className="w-full"
                min="0"
                placeholder="How much are you willing to pay?"
                step="0.1"
                type="number"
                {...form.register("price", { valueAsNumber: true })}
              />
            </FormControl>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your bid will be submitted to the seller.
            </p>
            {form.formState.errors.price && (
              <FormMessage>{form.formState.errors.price.message}</FormMessage>
            )}
          </FormItem>
        </CardContent>
        <CardFooter className="flex">
          <Button
            type="submit"
            className="mt-5 w-full bg-green-600 hover:bg-green-700 dark:text-foreground"
          >
            Submit Offer
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
