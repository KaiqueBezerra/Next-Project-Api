import { FavoriteRepositoryPrisma } from "../repositories/favorites-repository";
import {
  AddFavorite,
  FavoriteRepository,
  GetFavorite,
} from "../interfaces/favorites-interface";
import { ProjectRepositoryPrisma } from "../repositories/projects-repository";
import { ProjectRepository } from "../interfaces/projects-interface";

class FavoriteUseCase {
  private favoriteRepository: FavoriteRepository;
  private projectRepository: ProjectRepository;

  constructor() {
    this.favoriteRepository = new FavoriteRepositoryPrisma();
    this.projectRepository = new ProjectRepositoryPrisma();
  }

  async addFavorite({ userId, projectId }: AddFavorite): Promise<void> {
    const project = await this.projectRepository.findProjectById(projectId);

    if (!project.project) {
      throw new Error("Project not found.");
    }

    await this.favoriteRepository.addFavorite({
      userId,
      projectId,
    });
  }

  async deleteFavorite({ userId, projectId }: AddFavorite): Promise<void> {
    const project = await this.projectRepository.findProjectById(projectId);

    if (!project.project) {
      throw new Error("Project not found.");
    }

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
