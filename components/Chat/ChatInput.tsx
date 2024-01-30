import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormItem } from '@/components/ui/form';
import { Icons } from '@/app/ui/icons';
import { Input } from '../ui/input';
import Skeleton from 'react-loading-skeleton';
import FileUploadModal from '../modals/fileUploadModal';
import { chatHandler } from '../../lib/actions/chat.actions';


interface chatInputProps {
    userId1: string;
    userId2: string;
}

// to check the empty messages are not sent
const messageSchema = z.object({
    content: z.string().min(1),
});

export default function ChatInput({ userId1, userId2 }: chatInputProps) {
    const form = useForm({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            content: '',
        },
    });

    const isLoading = form.formState.isSubmitting;

    async function onSend(values: z.infer<typeof messageSchema>) {
        try {
            console.log("hello from frontend")
            await chatHandler(userId1, userId2).then((res) => {
                console.log(`res ${res}`)
            }).catch((err) => {
                console.log(`err ${err}`);
            });
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSend)} className='flex max-w-full '>
                <FormItem>
                    <FormControl >
                        <div className="flex flex-1">
                            <div className="border p-1 rounded-md max-w-[95%] border-gray-300 dark:bg-gray-900 flex justify-between">
                                <Input
                                    disabled={isLoading}
                                    className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
                                    {...form.register('content')}
                                />
                                <div className="flex space-x-1">
                                    <FileUploadModal />
                                    <button type="button">
                                        <Icons.image className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700 transform hover:scale-105 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </FormControl>
                </FormItem>
                {<button type='submit'><Icons.sendIcon
                    className="w-9 h-9 bg-blue-200 dark:bg-blue-300 p-2 rounded-full text-blue-500 dark:text-blue-700 cursor-pointer  transform hover:scale-105 transition-transform"

                /> </button> || <Skeleton circle width={40} height={40} baseColor='#e2e8f0' highlightColor='#f7fafc' />
                }
            </form>
        </Form>
    );
}
