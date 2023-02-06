import placesRepository from "@/repositories/places-repository";
import { Favorite, Place } from "@prisma/client";


export async function getDistrictPlaces(district: string): Promise<Place[]> {

  return placesRepository.findMany(district);
}

export async function favoritePlace(placeId: number, userId: number): Promise<Favorite> {

  return placesRepository.createFavorite(placeId, userId);
}

export async function unfavoritePlace(favoriteId: number): Promise<Favorite> {
  return placesRepository.deleteFavorite(favoriteId);
}

export async function unfavoriteAllPlaces(userId: number) {
  return placesRepository.deleteAllFavorites(userId);
}

const placesService = {
  getDistrictPlaces,
  favoritePlace,
  unfavoritePlace,
  unfavoriteAllPlaces
};

export default placesService;
