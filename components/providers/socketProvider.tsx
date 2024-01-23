"use client"

import { useContext, useEffect, useState, createContext, ReactNode } from "react"
import { io as IoClient } from "socket.io-client"

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
}

const socketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
})

export const useSocket = () => {
    return useContext(socketContext)
}


export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState(null)
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        // we need not add anything for this in the env, dev => localhost, deployment => our own url
        const socketInstance = new (IoClient as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: "/api/socket/io",
            addTrailingSlash: false
        });

        socketInstance.on("connect", function () {
            setIsConnected(true)
        })

        socketInstance.on("disconnect", function () {
            setIsConnected(false)
        })

        setSocket(socketInstance)

        return function () {
            socketInstance.disconnect();
        }

    }, [])


    return (
        <socketContext.Provider value={{ socket, isConnected }}>
            {children}
        </socketContext.Provider>
    )

}