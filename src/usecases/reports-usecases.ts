import { ProjectRepository } from "../interfaces/projects-interface";
import {
  ReportCreate,
  ReportRepository,
} from "../interfaces/reports-interface";
import { ProjectRepositoryPrisma } from "../repositories/projects-repository";
import { ReportRepositoryPrisma } from "../repositories/reports-repository";

class ReportUseCase {
  private reportRepository: ReportRepository;
  private projectRepository: ProjectRepository;

  constructor() {
    this.reportRepository = new ReportRepositoryPrisma();
    this.projectRepository = new ProjectRepositoryPrisma();
  }

  async createReport({
    comment,
    userId,
    projectId,
  }: ReportCreate): Promise<void> {
    const project = await this.projectRepository.findProjectById(userId);

    if (!project.project) {
      throw new Error("Project not found.");
    }

    await this.reportRepository.createReport({
      comment,
      userId,
      projectId,
    });
  }
}

export { ReportUseCase };
