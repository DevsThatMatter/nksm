"use client";
import React from "react";
import { Card } from "@/app/components/ui/card";

function ErrorPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="p-6 text-center">
        <h2 className="mb-4 text-2xl font-bold">Oh no!</h2>
        <p className="mb-4 text-lg">Unknown error occured</p>
      </Card>
    </div>
  );
}

export default ErrorPage;
