import { Router } from "express";

import { createUserSchema, updateEmailSchema, updatePasswordSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { emailPost, passwordPost, usersDelete, usersPost } from "@/controllers";

const usersRouter = Router();

usersRouter.post("/", validateBody(createUserSchema), usersPost);
usersRouter.post("/settings/email", validateBody(updateEmailSchema), emailPost);
usersRouter.post("/settings/password", validateBody(updatePasswordSchema), passwordPost);
usersRouter.delete("/:userId", usersDelete);

export { usersRouter };
