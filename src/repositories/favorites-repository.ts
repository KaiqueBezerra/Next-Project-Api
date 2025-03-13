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

  async deleteFavorite(data: AddFavorite): Promise<void> {
    await prisma.favorite.deleteMany({
      where: {
        userId: data.userId,
        projectId: data.projectId,
      },
    });
  }

  async favoritesVerify(userId: string, projectId: string): Promise<boolean> {
    const count = await prisma.favorite.count({
      where: {
        userId: userId,
        projectId: projectId,
      },
    });

    if (count > 0) {
      return true;
    } else {
      return false;
    }
  }
}

export { FavoriteRepositoryPrisma };
