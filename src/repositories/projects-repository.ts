import { prisma } from "../db/prisma-client";
import {
  Project,
  ProjectCreate,
  ProjectGet,
  ProjectRepository,
} from "../interfaces/projects-interface";

class ProjectRepositoryPrisma implements ProjectRepository {
  async createProject(data: ProjectCreate): Promise<void> {
    await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        userId: data.userId,
        requirements: data.requirements,
        phoneNumber: data.phoneNumber,
      },
    });
  }

  async findAllProjects(
    search: string,
    filter: string,
    page: number,
    limit: number
  ): Promise<Project[]> {
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

  async findProjectById(id: string): Promise<ProjectGet> {
    const result = await prisma.project.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        requirements: true,
        userId: true,
        phoneNumber: true,
        createdAt: true,
        updatedAt: true,
        User: {
          select: {
            name: true,
          },
        },
      },
    });

    const favoriteCount = await prisma.favorite.count({
      where: { projectId: id },
    });

    return { project: result, favoriteCount };
  }

  async findProjectsByUserId(
    userId: string,
    page: number,
    limit: number
  ): Promise<Project[]> {
    const result = await prisma.project.findMany({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    return result;
  }

  async findProjectsByUserIdNoToken(
    userId: string,
    page: number,
    limit: number
  ): Promise<Project[]> {
    const result = await prisma.project.findMany({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    return result;
  }

  async getProjectsCountByUserId(userId: string): Promise<number> {
    const result = await prisma.project.count({
      where: { userId },
    });

    return result;
  }

  async updateProject(id: string, data: ProjectCreate): Promise<void> {
    await prisma.project.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        requirements: data.requirements,
        phoneNumber: data.phoneNumber,
      },
    });
  }

  async deleteProject(id: string, userId: string): Promise<void> {
    await prisma.project.delete({
      where: { id },
    });
  }
}

export { ProjectRepositoryPrisma };
