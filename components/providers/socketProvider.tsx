"use client"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { io as clientIo } from "socket.io-client"




type socketContextType = {
    socket: any | null,
    isConnected: boolean
}

const socketContext = createContext<socketContextType>({
    socket: null,
    isConnected: false
})


export const useSocket = () => {
    return useContext(socketContext)

}


export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState(null)
    const [isConnected, setIsConnected] = useState<boolean>(false)

    useEffect(() => {
        const socketInstance = new (clientIo as any)(
            process.env.NEXT_PUBLIC_SITE_URL!, {
            path: "/api/socket/io",
            addTralingSlash: false
        })
        socketInstance.on("connect", () => {
            console.log("got connected")
            setIsConnected(true)
        })
        socketInstance.on("diconnect", () => {
            setIsConnected(false)
        })
        setSocket(socketInstance)
        return () => {
            socketInstance.disconnect()
        }
    }, [])
    return (
        <socketContext.Provider value={{ socket, isConnected }}>
            {children}
        </socketContext.Provider>
    )
}
