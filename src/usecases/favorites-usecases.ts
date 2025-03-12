import { FavoriteRepositoryPrisma } from "../repositories/favorites-repository";
import { AuthService } from "../services/auth-service";
import {
  AddFavorite,
  Favorite,
  FavoriteRepository,
} from "../interfaces/favorites.interface";

class FavoriteUseCase {
  private favoriteRepository: FavoriteRepository;

  constructor() {
    this.favoriteRepository = new FavoriteRepositoryPrisma();
  }

  async addFavorite({ userId, projectId }: AddFavorite): Promise<Favorite> {
    const result = await this.favoriteRepository.addFavorite({
      userId,
      projectId,
    });

    return result;
  }
}

export { FavoriteUseCase };
