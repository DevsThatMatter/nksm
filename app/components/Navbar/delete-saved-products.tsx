"use client"
import React from 'react';
import { Button } from '../ui/button';
import { removeSavedProduct } from '@/lib/actions/fetchProduct.actions';
import { Icons } from '@/app/utils/icons';

export default function DeleteSavedProducts({ productId, email }: { productId: string, email: string }) {

    async function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        console.log("delete was triggered");
        event.preventDefault();
        event.stopPropagation();
        await removeSavedProduct({
            productId: productId,
            email: email,
        });
    }

    return (
        <Button
            size="icon"
            className="h-6 w-10 bg-red-300 text-foreground hover:bg-red-400"
            onClick={(event) => handleDelete(event)}
        >
            <Icons.delete className="text-red-700" />
        </Button>
    )
}
