import { FastifyInstance } from "fastify";
import { FavoriteUseCase } from "../usecases/favorites-usecases";
import { authMiddleware } from "../middlewares/auth-middleware";
import { AddFavorite } from "../interfaces/favorites.interface";

export async function favoritesRoutes(fastify: FastifyInstance) {
  const favoriteUseCase = new FavoriteUseCase();

  fastify.post<{ Body: AddFavorite }>(
    "/",
    { preHandler: authMiddleware },
    async (request, reply) => {
      const { id: userId } = request.user as { id: string };
      const { projectId } = request.body;

      try {
        const result = await favoriteUseCase.addFavorite({ userId, projectId });
        return reply.status(201).send(result);
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
}
