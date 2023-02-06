import { CreateUserParams, UpdateEmailParams, UpdatePasswordParams } from "@/services/users-service";
import Joi from "joi";

export const createUserSchema = Joi.object<CreateUserParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const updateEmailSchema = Joi.object<UpdateEmailParams>({
  email: Joi.string().email().required(),
  id: Joi.number().required()
});

export const updatePasswordSchema = Joi.object<UpdatePasswordParams>({
  password: Joi.string().min(6).required(),
  id: Joi.number().required()
});
