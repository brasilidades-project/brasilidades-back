import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

async function updateEmail({ email }: Prisma.UserUpdateInput, userId: number) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email: email,
    },
  });
}

async function updatePassword({ password }: Prisma.UserUpdateInput, userId: number) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: password,
    },
  });
}

async function deleteAllSessions(userId: number) {
  return prisma.session.deleteMany({
    where: {
      userId: userId
    }
  });
}

async function deleteAccount(userId: number) {
  return prisma.user.delete({
    where: {
      id: userId
    }
  });
}

const userRepository = {
  findByEmail,
  create,
  updateEmail,
  updatePassword,
  deleteAccount,
  deleteAllSessions
};

export default userRepository;
