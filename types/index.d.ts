import { Socket, Server as netServer } from "net"
import { NextApiResponse } from "next"
import { Server as socketIoServer } from 'socket.io'

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: netServer & {
            io: socketIoServer
        }
    }
}