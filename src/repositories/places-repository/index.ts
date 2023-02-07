import { prisma } from "@/config";

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

async function findManyFavorites(userId: number) {
  return prisma.place.findMany({
    where: {
      Favorite: { 
        some: { 
          userId 
        } 
      }
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
  deleteAllFavorites,
  findManyFavorites
};

export default placesRepository;
