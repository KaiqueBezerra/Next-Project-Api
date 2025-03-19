import { FavoriteRepositoryPrisma } from "../repositories/favorites-repository";
import { AuthService } from "../services/auth-service";
import {
  AddFavorite,
  Favorite,
  FavoriteRepository,
  GetFavorite,
} from "../interfaces/favorites.interface";

class FavoriteUseCase {
  private favoriteRepository: FavoriteRepository;

  constructor() {
    this.favoriteRepository = new FavoriteRepositoryPrisma();
  }

  async addFavorite({ userId, projectId }: AddFavorite): Promise<void> {
    await this.favoriteRepository.addFavorite({
      userId,
      projectId,
    });
  }

  async deleteFavorite({ userId, projectId }: AddFavorite): Promise<void> {
    await this.favoriteRepository.deleteFavorite({ userId, projectId });
  }

  async findFavoritesByUserId(userId: string): Promise<GetFavorite[]> {
    const result = await this.favoriteRepository.findFavoritesByUserId(userId);

    return result;
  }

  async favoritesVerify(userId: string, projectId: string): Promise<boolean> {
    const result = await this.favoriteRepository.favoritesVerify(
      userId,
      projectId
    );

    return result;
  }
}

export { FavoriteUseCase };
