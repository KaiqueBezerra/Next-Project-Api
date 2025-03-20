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

  async createProject({
    name,
    description,
    requirements,
    userId,
    phoneNumber,
  }: ProjectCreate): Promise<void> {
    await this.projectRepository.createProject({
      name,
      description,
      requirements,
      userId,
      phoneNumber,
    });
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

  async findProjectByUserId(
    userId: string,
    page: string,
    limit: string
  ): Promise<Project[]> {
    const numberPage = Number(page);
    const numberLimit = Number(limit);

    const result = await this.projectRepository.findProjectByUserId(
      userId,
      numberPage,
      numberLimit
    );

    if (!result) {
      throw new Error("Projetos não encontrados.");
    }

    return result;
  }

  async updateProject(id: string, data: ProjectCreate): Promise<void> {
    const project = await this.projectRepository.findProjectById(id);

    if (!project) {
      throw new Error("Projeto não encontrado.");
    }

    if (project.project?.userId === data.userId) {
      await this.projectRepository.updateProject(id, data);
    } else {
      throw new Error("Usuário nao autorizado.");
    }
  }

  async deleteProject(id: string, userId: string): Promise<void> {
    const project = await this.projectRepository.findProjectById(id);

    if (!project) {
      throw new Error("Projeto não encontrado.");
    }

    if (project.project?.userId === userId) {
      await this.projectRepository.deleteProject(id, userId);
    } else {
      throw new Error("Usuário nao autorizado.");
    }
  }
}

export { ProjectUseCase };
