"use client";

import { useSocket } from "@/app/components/providers/socketProvider";
import { Badge } from "@/app/components/ui/badge";

export function SocketIOIndicator() {
  const { isConnected } = useSocket();
  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-amber-500 text-white border-none">
        Fallback: Polling every second
      </Badge>
    );
  } else {
    return (
      <Badge
        variant="outline"
        className="bg-emerald-500 text-white border-none"
      >
        live real-time updates
      </Badge>
    );
  }
}
