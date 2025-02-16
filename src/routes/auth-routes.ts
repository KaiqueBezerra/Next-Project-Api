import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/users-usecases";
import { AuthService } from "../services/auth-service";

export async function authRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();

  fastify.post<{ Body: { email: string; password: string } }>(
    "/user",
    async (request, reply) => {
      const { email, password } = request.body;

      try {
        const token = await userUseCase.authenticate(email, password);
        return reply.send({ token });
      } catch (error) {
        return reply.status(401).send(error);
      }
    }
  );

  fastify.get("/user", async (request, reply) => {
    const token = request.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return reply
        .status(401)
        .send({ error: "Unauthorized - No Token Provided" });
    }

    const userData = AuthService.getUserFromToken(token);

    if (!userData) {
      return reply.status(401).send({ error: "Unauthorized - Invalid Token" });
    }

    try {
      const user = await userUseCase.findUserById(userData.id);

      if (!user) {
        return reply.status(404).send({ error: "User Not Found" });
      }

      return reply.send(user);
    } catch (error) {
      return reply.status(500).send(error);
    }
  });
}
