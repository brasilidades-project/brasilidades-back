import { AuthenticatedRequest } from "@/middlewares";
import userService from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import authenticationService from "../services/authentication-service";

export async function usersPost(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await userService.createUser({ email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function emailPost(req: AuthenticatedRequest, res: Response) {
  const { email, id } = req.body;
  const userId = id;

  try {
    const user = await userService.updateEmail(email, userId);
    const token = await authenticationService.createSession(userId);
    return res.status(httpStatus.CREATED).json({
      user:{
        id: user.id,
        email: user.email,
      }, 
      token
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function passwordPost(req: AuthenticatedRequest, res: Response) {
  const { password, id } = req.body;
  const userId = id;

  try {
    const user = await userService.updatePassword(password, userId);
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
