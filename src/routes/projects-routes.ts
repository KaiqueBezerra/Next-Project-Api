import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middlewares/auth-middleware";
import { ProjectUseCase } from "../usecases/projects-usecases";
import { ProjectCreate } from "../interfaces/projects-interface";

export async function projectRoutes(fastify: FastifyInstance) {
  const projectUseCase = new ProjectUseCase();

  fastify.post<{ Body: ProjectCreate }>(
    "/",
    { preHandler: authMiddleware },
    async (request, reply) => {
      const { name, description, requirements, phoneNumber } = request.body;
      const { id: userId } = request.user as { id: string };

      try {
        await projectUseCase.createProject({
          name,
          description,
          requirements,
          userId,
          phoneNumber,
        });

        return reply.status(201).send();
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );

  fastify.get<{
    Querystring: {
      search: string;
      filter: string;
      page: string;
      limit: string;
    };
  }>("/", async (request, reply) => {
    const { search, filter, page, limit } = request.query;

    try {
      const result = await projectUseCase.findAllProjects(
        search,
        filter,
        page,
        limit
      );
      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send(error);
    }
  });

  fastify.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      const result = await projectUseCase.findProjectById(id);
      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send(error);
    }
  });

  fastify.get<{
    Querystring: {
      page: string;
      limit: string;
    };
  }>("/user/", { preHandler: authMiddleware }, async (request, reply) => {
    const { id: userId } = request.user as { id: string };
    const { page, limit } = request.query;

    try {
      const result = await projectUseCase.findProjectsByUserId(
        userId,
        page,
        limit
      );
      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send(error);
    }
  });

  fastify.get<{
    Querystring: {
      page: string;
      limit: string;
    };
  }>("/user/:userId", async (request, reply) => {
    const { userId } = request.params as { userId: string };
    const { page, limit } = request.query;

    try {
      const result = await projectUseCase.findProjectsByUserIdNoToken(
        userId,
        page,
        limit
      );
      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send(error);
    }
  });

  fastify.get<{
    Params: {
      userId: string;
    };
  }>("/count/:userId", async (request, reply) => {
    const { userId } = request.params;

    try {
      const result = await projectUseCase.getProjectsCountByUserId(userId);
      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send(error);
    }
  });

  fastify.put<{
    Body: {
      name: string;
      description: string;
      requirements: string[];
      phoneNumber: string;
    };
  }>("/:id", { preHandler: authMiddleware }, async (request, reply) => {
    const { id: userId } = request.user as { id: string };
    const { id } = request.params as { id: string };
    const { name, description, requirements, phoneNumber } = request.body;

    try {
      await projectUseCase.updateProject(id, {
        name,
        description,
        requirements,
        phoneNumber,
        userId,
      });
      return reply.status(200).send();
    } catch (error) {
      return reply.status(500).send(error);
    }
  });

  fastify.delete<{ Params: { id: string } }>(
    "/:id",
    { preHandler: authMiddleware },
    async (request, reply) => {
      const { id: userId } = request.user as { id: string };
      const { id } = request.params;

      try {
        await projectUseCase.deleteProject(id, userId);
        return reply.status(200).send();
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
}
