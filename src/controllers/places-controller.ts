import { AuthenticatedRequest } from "@/middlewares";
import placesService from "@/services/places-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function placesGet(req: AuthenticatedRequest, res: Response) {
  const { district } = req.params;

  try {
    const places = await placesService.getDistrictPlaces(district);
    return res.status(httpStatus.OK).send(places);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function favoritePlacesGet(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.params;

  try {
    const places = await placesService.getFavoritePlaces(Number(userId));
    return res.status(httpStatus.OK).send(places);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function placesPost(req: AuthenticatedRequest, res: Response) {
  const { placeId, userId } = req.body;

  try {
    const favorite = await placesService.favoritePlace(placeId, userId);
    return res.status(httpStatus.CREATED).send(favorite);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function placesDelete(req: AuthenticatedRequest, res: Response) {
  const { favoriteId } = req.params;

  try {
    const unfavorite = await placesService.unfavoritePlace(Number(favoriteId));
    return res.status(httpStatus.OK).send(unfavorite);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function placesDeleteAll(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.params;

  try {
    const unfavorite = await placesService.unfavoriteAllPlaces(Number(userId));
    return res.status(httpStatus.OK).send(unfavorite);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
