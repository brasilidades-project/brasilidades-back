import { Router } from "express";

import { placesDelete, placesDeleteAll, placesGet, placesPost } from "@/controllers";

const placesRouter = Router();

placesRouter.get("/:district", placesGet);
placesRouter.post("/", placesPost);
placesRouter.delete("/:favoriteId", placesDelete);
placesRouter.delete("/all/:userId", placesDeleteAll);

export { placesRouter };
