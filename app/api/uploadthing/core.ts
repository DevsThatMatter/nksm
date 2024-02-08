import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();

const auth = () => ({ id: "fakeId" }); // <TODO> change this to auth that we ar using
export const ourFileRouter = {
    image: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } }).middleware(() => auth()).onUploadComplete(() => { }),
    messageFile: f(["image", "pdf", "video", "audio"]).middleware(() => auth()).onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;