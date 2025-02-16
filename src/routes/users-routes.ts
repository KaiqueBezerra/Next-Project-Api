import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/users-usecases";
import { UserCreate } from "../interfaces/users-interface";

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();

  fastify.post<{ Body: UserCreate }>("/", async (request, reply) => {
    const { email, password } = request.body;

    try {
      const result = await userUseCase.create({ email, password });
      return reply.status(201).send(result);
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
}
