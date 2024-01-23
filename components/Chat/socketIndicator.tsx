"use client"

import { useSocket } from "../providers/socketProvider"
import { Badge } from "../ui/badge"

export function SocketIOIndicator() {
    const { isConnected } = useSocket()
    if (!isConnected) {
        return (
            <Badge variant="outline" className="bg-amber-500 text-white border-none">
                Fallback: Polling every second
            </Badge>
        )
    } else {
        return (
            <Badge variant="outline" className="bg-emerald-500 text-white border-none">
                live real-time updates
            </Badge>
        )
    }
}