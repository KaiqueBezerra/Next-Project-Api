import { prisma } from "../db/prisma-client";
import {
  Project,
  ProjectCreate,
  ProjectRepository,
} from "../interfaces/projects-interface";

class ProjectRepositoryPrisma implements ProjectRepository {
  async create(data: ProjectCreate): Promise<Project> {
    const result = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
        requirements: data.requirements,
        phoneNumber: data.phoneNumber,
      },
    });

    return result;
  }

  async findAllProject(
    search: string,
    filter: string,
    page: number,
    limit: number
  ): Promise<Project[] | null> {
    const whereCondition: any = {};

    // Verificar o parâmetro de filtro (filter)
    if (filter) {
      switch (filter) {
        case "1h":
          whereCondition.createdAt = {
            gte: new Date(Date.now() - 60 * 60 * 1000),
          };
          break;
        case "1d":
          whereCondition.createdAt = {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          };
          break;
        case "1w":
          whereCondition.createdAt = {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          };
          break;
        default:
          break;
      }
    }

    const result = await prisma.project.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive", // Torna a pesquisa case-insensitive
        },
        createdAt: whereCondition.createdAt,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    return result;
  }

  async findProjectById(id: string): Promise<Project | null> {
    const result = await prisma.project.findUnique({
      where: { id },
    });

    return result;
  }
}

export { ProjectRepositoryPrisma };
