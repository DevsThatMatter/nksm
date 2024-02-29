import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

const cluster = "ap2"
const useTLS = true

export const pusherServer = new PusherServer({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!, key:  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET!, cluster: cluster, useTLS: useTLS
})

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, { cluster })
