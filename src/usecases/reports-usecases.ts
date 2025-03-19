import {
  ReportCreate,
  ReportRepository,
} from "../interfaces/reports-interface";
import { ReportRepositoryPrisma } from "../repositories/reports-repository";

class ReportUseCase {
  private reportRepository: ReportRepository;

  constructor() {
    this.reportRepository = new ReportRepositoryPrisma();
  }

  async createReport({
    comment,
    userId,
    projectId,
  }: ReportCreate): Promise<void> {
    await this.reportRepository.createReport({
      comment,
      userId,
      projectId,
    });
  }
}

export { ReportUseCase };
