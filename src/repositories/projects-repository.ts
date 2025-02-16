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

  async findAllProject(search?: string): Promise<Project[] | null> {
    const whereCondition =
      !search || search.trim() === "" || search === "undefined"
        ? {}
        : { name: { contains: search, mode: "insensitive" as "insensitive" } };

    const result = await prisma.project.findMany({
      where: whereCondition,
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
