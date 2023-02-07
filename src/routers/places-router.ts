import { Router } from "express";

import { placesDelete, placesDeleteAll, placesGet, placesPost, favoritePlacesGet } from "@/controllers";

const placesRouter = Router();

placesRouter.get("/:district", placesGet);
placesRouter.post("/", placesPost);
placesRouter.delete("/:favoriteId", placesDelete);
placesRouter.delete("/all/:userId", placesDeleteAll);
placesRouter.get("/favorites/:userId", favoritePlacesGet);

export { placesRouter };
