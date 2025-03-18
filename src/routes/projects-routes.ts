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
        const result = await projectUseCase.create({
          name,
          description,
          requirements,
          userId,
          phoneNumber,
        });

        return reply.status(201).send(result);
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
      const result = await projectUseCase.findAllProject(
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
      const result = await projectUseCase.findProjectByUserId(
        userId,
        page,
        limit
      );
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
      const result = await projectUseCase.update(id, {
        name,
        description,
        requirements,
        phoneNumber,
        userId,
      });
      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send(error);
    }
  });
}
