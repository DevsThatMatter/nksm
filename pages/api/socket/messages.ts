import { currentUser } from "@/lib/forPages/currentUser";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "No method other than post is accepted" })
    }
    try {
        const userId = await currentUser()
        const otherUserId = req.query
        const { content, files } = req.body
        if (!userId) {
            res.status(401).json({
                data: null,
                msg: "Error, THE_USER_IS_NOT_SIGNED_IN",
                extra: null,
            })
        }
        if (!userId) {
            res.status(401).json({
                data: null,
                msg: "Error, NO_CONTENT_WAS_FOUND_IN_THE_REQUEST_BODY",
                extra: null,
            })
        }

        // <todo> use any orm for fetching the other user from the data base
        // dummy data
        const otherUserProfile = "bits2"
        // <todo> create a new message using all of this data
        // dummy data
        const message = { content: "hello", type: "" }
        // the type include text or file
        const key = `chat:${userId}:messages`
        res?.socket?.server?.io?.emit(key,message)
        return res.status(200).json({
            data: message.content,
            msg: "Success, THE_REQUEST_WAS_SUCCESSFULY_HANDELED",
            extra: message.type
        })

    } catch (error) {
        console.log("ERROR_IN_MESSAGE.TS_WHILE_HANDLEING_THE_REQUEST", error);
        return res.status(500).json({
            data: null,
            message: "Internal Server Error",
            extra: null
        })
    }
}