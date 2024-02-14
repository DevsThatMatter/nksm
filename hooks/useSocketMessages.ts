import { useSocket } from "@/app/components/providers/socketProvider"
import { MessageTypes } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

type SocketMessagesProps = {
    addKey: string,
    queryKey: string,
    updateKey: string,
}



export function useSocketMessages({
    addKey,
    queryKey,
    updateKey,
}: SocketMessagesProps) {
    const { socket } = useSocket()
    const queryClient = useQueryClient()
    
    useEffect(() => {
        socket.on(addKey, function (message: MessageTypes) {
            queryClient.setQueryData([queryKey], function (oldData: any) {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {
                        pages: [{
                            items: [message]
                        }]
                    }
                }
                const newData = [...oldData.pages];
                newData[0] = {
                    ...newData[0],
                    items: [
                        message,
                        ...newData[0].items
                    ]
                }
                return {
                    oldData,
                    pages: newData
                }
            })
        })
        return function () {
            socket.off(addKey);
            socket.off(updateKey)
        }
    }, [queryClient, addKey, queryKey, socket])
}