'use client'
import React from 'react';
import { Card } from '@/app/components/ui/card';

function ErrorPage(){
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Oh no!</h2>
        <p className="text-lg mb-4">Unknown error occured</p>
      </Card>
    </div>
  );
}

export default ErrorPage;
