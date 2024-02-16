"use client";
import { Button } from "@/app/components/ui/button";
import { Input } from "../ui/input";
import { Form } from "react-hook-form";
import { FormDataSchema } from "@/lib/FormSchema/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = z.infer<typeof FormDataSchema>;
  
export default function AddListingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form
        className="mt-12 py-12 max-w-screen-lg mx-auto"
        onSubmit={handleSubmit(processForm)}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label
              htmlFor="iname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Item Name
            </label>
            <div className="mt-1">
              <Input
                type="text"
                id="iname"
                {...register("iname")}
                autoComplete="given-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
              {errors.iname && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.iname.message}
                </p>
              )}
            </div>
          </div>
          <div className="sm:col-span-1">
            <label
              htmlFor="images"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image
            </label>
            <div className="mt-1">
              <Input
                type="file"
                id="images"
                {...register("images")}
                autoComplete="given-name"
                multiple
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
              {errors.images && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.images.message}
                </p>
              )}
            </div>
          </div>
          <div className="sm:col-span-1">
            <label
              htmlFor="condition"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Condition
            </label>
            <div className="mt-1 relative">
              <select
                id="condition"
                {...register("condition")}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm py-2 px-4"
              >
                <option>Brand New</option>
                <option>Like New</option>
                <option>Old</option>
              </select>

              <path
                fillRule="evenodd"
                d="M9.293 14.707a1 1 0 0 0 1.414 0l5-5a1 1 0 1 0-1.414-1.414L10 12.586l-4.293-4.293a1 1 0 1 0-1.414 1.414l5 5z"
                clipRule="evenodd"
              />

              {errors.condition && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.condition.message}
                </p>
              )}
            </div>
          </div>
          <div className="sm:col-span-1">
            <label
              htmlFor="Description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-1">
              <Input
                type="text"
                id="Description"
                {...register("Description")}
                autoComplete="given-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
              {errors.Description && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.Description.message}
                </p>
              )}
            </div>
          </div>
          <div className="sm:col-span-1">
            <label
              htmlFor="Price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Price
            </label>
            <div className="mt-1">
              <Input
                type="number"
                min = "0"
                id="Price"
                {...register("Price")}
                autoComplete="given-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
              {errors.Price && (
                <p className="mt-2 text-sm text-red-600" role="alert">
                  {errors.Price.message}
                </p>
              )}
            </div>
          </div>
          <div className="sm:col-span-1"></div>
        </div>
        <div className="mt-8 pt-5">
          <Button
            type="submit"
            className="rounded bg-white px-4 py-2 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
