import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { AWSProvider } from "@/app/components/providers/r2-provider";
import { z } from "zod";

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicImages: es
    .imageBucket({
      maxSize: 1024 * 1024 * 5,
      accept: ["image/*"], // wildcard also works: ['image/*']
    })
    .input(
      z.object({
        category: z.string(),
      }),
    )
    // e.g. /publicFiles/{category}/{author}
    .path(({ input }) => [{ category: input.category }]),
});

const handler = createEdgeStoreNextHandler({
  provider: AWSProvider(),
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
