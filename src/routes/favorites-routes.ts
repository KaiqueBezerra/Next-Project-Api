import { FastifyInstance } from "fastify";
import { FavoriteUseCase } from "../usecases/favorites-usecases";
import { authMiddleware } from "../middlewares/auth-middleware";
import { AddFavorite } from "../interfaces/favorites.interface";

export async function favoritesRoutes(fastify: FastifyInstance) {
  const favoriteUseCase = new FavoriteUseCase();

  fastify.post<{ Params: { projectId: string } }>(
    "/:projectId",
    { preHandler: authMiddleware },
    async (request, reply) => {
      const { id: userId } = request.user as { id: string };
      const { projectId } = request.params;

      try {
        const result = await favoriteUseCase.addFavorite({ userId, projectId });
        return reply.status(201).send(result);
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );

  fastify.delete<{ Params: { projectId: string } }>(
    "/:projectId",
    { preHandler: authMiddleware },
    async (request, reply) => {
      const { id: userId } = request.user as { id: string };
      const { projectId } = request.params;

      try {
        await favoriteUseCase.deleteFavorite({
          userId,
          projectId,
        });
        return reply.status(200);
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );

  fastify.get<{ Params: { projectId: string } }>(
    "/:projectId",
    { preHandler: authMiddleware },
    async (request, reply) => {
      const { id: userId } = request.user as { id: string };
      const { projectId } = request.params;

      try {
        const result = await favoriteUseCase.favoritesVerify(userId, projectId);
        return reply.status(200).send(result);
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
}
