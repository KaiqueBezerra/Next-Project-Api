import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/users-usecases";
import { UserCreate } from "../interfaces/users-interface";
import { authMiddleware } from "../middlewares/auth-middleware";

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();

  fastify.post<{ Body: UserCreate }>("/", async (request, reply) => {
    const { name, email, password } = request.body;

    try {
      const result = await userUseCase.createUser({ name, email, password });
      return reply.status(201).send();
    } catch (error) {
      return reply.status(500).send(error);
    }
  });

  fastify.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const { id } = request.params;

    try {
      const result = await userUseCase.findUserById(id);
      return reply.status(201).send(result);
    } catch (error) {
      return reply.status(500).send(error);
    }
  });

  fastify.patch("/", { preHandler: authMiddleware }, async (request, reply) => {
    const { id } = request.user as { id: string };
    const { name } = request.body as { name: string };

    try {
      const result = await userUseCase.updateUser(id, name);
      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send(error);
    }
  });

  fastify.delete(
    "/",
    { preHandler: authMiddleware },
    async (request, reply) => {
      const { id } = request.user as { id: string };

      try {
        await userUseCase.deleteUser(id);
        return reply.status(200).send();
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
}
