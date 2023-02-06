import { Router } from "express";

import { placesDelete, placesGet, placesPost } from "@/controllers";

const placesRouter = Router();

placesRouter.get("/:district", placesGet);
placesRouter.post("/", placesPost);
placesRouter.delete("/:favoriteId", placesDelete);

export { placesRouter };
