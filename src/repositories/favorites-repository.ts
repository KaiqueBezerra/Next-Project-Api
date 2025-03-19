import { prisma } from "../db/prisma-client";
import {
  AddFavorite,
  Favorite,
  FavoriteRepository,
  GetFavorite,
} from "../interfaces/favorites.interface";

class FavoriteRepositoryPrisma implements FavoriteRepository {
  async addFavorite(data: AddFavorite): Promise<void> {
    await prisma.favorite.create({
      data: {
        userId: data.userId,
        projectId: data.projectId,
      },
    });
  }

  async deleteFavorite(data: AddFavorite): Promise<void> {
    await prisma.favorite.deleteMany({
      where: {
        userId: data.userId,
        projectId: data.projectId,
      },
    });
  }

  async findFavoritesByUserId(userId: string): Promise<GetFavorite[]> {
    const result = await prisma.favorite.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        projectId: true,
        Project: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    return result;
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
