import { prisma } from "../db/prisma-client";
import {
  AddFavorite,
  Favorite,
  FavoriteRepository,
} from "../interfaces/favorites.interface";

class FavoriteRepositoryPrisma implements FavoriteRepository {
  async addFavorite(data: AddFavorite): Promise<Favorite> {
    const result = await prisma.favorite.create({
      data: {
        userId: data.userId,
        projectId: data.projectId,
      },
    });

    return result;
  }
}

export { FavoriteRepositoryPrisma };
