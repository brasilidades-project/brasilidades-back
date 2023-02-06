import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findMany(district: string) {
  return prisma.place.findMany({
    where: {
      district
    },
    include: {
      Favorite: true
    }
  });
}

async function createFavorite(placeId: number, userId: number) {
  return prisma.favorite.create({
    data: {
      userId,
      placeId
    }
  });
}

async function deleteFavorite(favoriteId: number) {
  return prisma.favorite.delete({
    where: {
      id: favoriteId
    }
  });
}

async function deleteAllFavorites(userId: number) {
  return prisma.favorite.deleteMany({
    where: {
      userId: userId
    }
  });
}

const placesRepository = {
  findMany,
  createFavorite,
  deleteFavorite,
  deleteAllFavorites
};

export default placesRepository;
