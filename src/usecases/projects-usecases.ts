import {
  Project,
  ProjectCreate,
  ProjectRepository,
} from "../interfaces/projects-interface";
import { ProjectRepositoryPrisma } from "../repositories/projects-repository";

class ProjectUseCase {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepositoryPrisma();
  }

  async create({
    name,
    description,
    requirements,
    userId,
    phoneNumber,
  }: ProjectCreate): Promise<Project> {
    const result = await this.projectRepository.create({
      name,
      description,
      requirements,
      userId,
      phoneNumber,
    });

    return result;
  }

  async findAllProject(
    search: string,
    filter: string
  ): Promise<Project[] | null> {
    const result = await this.projectRepository.findAllProject(search, filter);

    return result;
  }

  async findProjectById(id: string): Promise<Project | null> {
    const result = await this.projectRepository.findProjectById(id);

    return result;
  }
}

export { ProjectUseCase };
