import PusherServer from "pusher";
import PusherClient from "pusher-js";

const cluster = "ap2";
const useTLS = true;

class PusherManager {
  private static pusherServer: PusherServer | null = null;
  private static pusherClient: PusherClient | null = null;

  public static getServerInstance(): PusherServer {
    if (!PusherManager.pusherServer) {
      PusherManager.pusherServer = new PusherServer({
        appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
        secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET!,
        cluster: cluster,
        useTLS: useTLS,
      });
    }
    return PusherManager.pusherServer;
  }

  public static getClientInstance(): PusherClient {
    if (!PusherManager.pusherClient) {
      PusherManager.pusherClient = new PusherClient(
        process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
        { cluster },
      );
    }
    return PusherManager.pusherClient;
  }
}

export const pusherServer = PusherManager.getServerInstance();
export const pusherClient = PusherManager.getClientInstance();
