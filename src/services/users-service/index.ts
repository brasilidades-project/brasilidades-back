import userRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError } from "./errors";

export async function createUser({ email, password }: CreateUserParams): Promise<User> {

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export async function updateEmail(email: string, userId: number): Promise<User> {

  await validateUniqueEmailOrFail(email);
  
  return userRepository.updateEmail({ email }, userId);
}

export async function updatePassword(password: string, userId: number): Promise<User> {

  password = await bcrypt.hash(password, 12);

  return userRepository.updatePassword({ password }, userId);
}

export type CreateUserParams = Pick<User, "email" | "password">;
export type UpdateEmailParams = Pick<User, "email" | "id">;
export type UpdatePasswordParams = Pick<User, "password" | "id">;

const userService = {
  createUser,
  updateEmail,
  updatePassword
};

export * from "./errors";
export default userService;
