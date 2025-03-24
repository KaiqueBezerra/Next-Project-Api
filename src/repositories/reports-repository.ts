import { prisma } from "../db/prisma-client";
import {
  ReportCreate,
  ReportRepository,
} from "../interfaces/reports-interface";

class ReportRepositoryPrisma implements ReportRepository {
  async createReport(data: ReportCreate): Promise<void> {

    await prisma.report.create({
      data: {
        comment: data.comment,
        userId: data.userId,
        projectId: data.projectId,
      },
    });
  }
}

export { ReportRepositoryPrisma };
