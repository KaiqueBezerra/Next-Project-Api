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

  async findAllProjects(
    search: string,
    filter: string,
    page: string,
    limit: string
  ): Promise<Project[]> {
    const numberPage = Number(page);
    const numberLimit = Number(limit);

    const result = await this.projectRepository.findAllProjects(
      search,
      filter,
      numberPage,
      numberLimit
    );

    return result;
  }

  async findProjectById(id: string): Promise<ProjectGet> {
    const result = await this.projectRepository.findProjectById(id);

    if (!result.project) {
      throw new Error("Project not found.");
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
      throw new Error("Projects not found.");
    }

    return result;
  }

  async updateProject(id: string, data: ProjectCreate): Promise<void> {
    const project = await this.projectRepository.findProjectById(id);

    if (!project.project) {
      throw new Error("Project not found.");
    }

    if (project.project?.userId === data.userId) {
      await this.projectRepository.updateProject(id, data);
    } else {
      throw new Error("user not authorized.");
    }
  }

  async deleteProject(id: string, userId: string): Promise<void> {
    const project = await this.projectRepository.findProjectById(id);

    if (!project.project) {
      throw new Error("Project not found.");
    }

    if (project.project?.userId === userId) {
      await this.projectRepository.deleteProject(id, userId);
    } else {
      throw new Error("user not authorized.");
    }
  }
}

export { ProjectUseCase };
