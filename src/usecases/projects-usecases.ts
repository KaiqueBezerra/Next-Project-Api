import {
  Project,
  ProjectCreate,
  ProjectGet,
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
    filter: string,
    page: string,
    limit: string
  ): Promise<Project[] | null> {
    const numberPage = Number(page);
    const numberLimit = Number(limit);

    const result = await this.projectRepository.findAllProject(
      search,
      filter,
      numberPage,
      numberLimit
    );

    return result;
  }

  async findProjectById(id: string): Promise<ProjectGet> {
    const result = await this.projectRepository.findProjectById(id);

    if (!result) {
      throw new Error("Projeto não encontrado.");
    }

    return result;
  }

  async findProjectByUserId(userId: string): Promise<Project[]> {
    const result = await this.projectRepository.findProjectByUserId(userId);

    if (!result) {
      throw new Error("Projetos não encontrados.");
    }

    return result;
  }
}

export { ProjectUseCase };
