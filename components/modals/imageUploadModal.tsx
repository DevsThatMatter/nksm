"use client"// Bits
import qs from 'query-string'
import { useModal } from '@/Hooks/modalStore';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { Form, useForm } from 'react-hook-form';
import * as z from 'zod'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { FormControl, FormField, FormItem } from '../ui/form';
import { Button } from '../ui/button';
import UploadFile from '../UploadFile';


const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: "Minimum one file is required"
    })
})

export default function ImageUploadModal() {
    const router = useRouter()
    const { isOpen, onClose, type, data } = useModal();
    const isThisModelOpen = isOpen && type === "fileUpload"
    const { apiUrl, query } = data

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
        }
    })

    const handleClose = () => {
        form.reset()
        onClose()
    }
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            });

            await axios.post(url, {
                ...values,
                content: values.fileUrl,
            });

            form.reset();
            router.refresh();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Dialog open={isThisModelOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Add an attachment
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Send a file as a message
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="fileUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                {/* <todo> this component still need to be coded */}
                                                <UploadFile />

                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="default" disabled={isLoading}>
                                Send
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
