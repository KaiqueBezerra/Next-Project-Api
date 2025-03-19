import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middlewares/auth-middleware";
import { ReportUseCase } from "../usecases/reports-usecases";

export async function ReportRoutes(fastify: FastifyInstance) {
  const reportUseCase = new ReportUseCase();

  fastify.post(
    "/:projectId",
    { preHandler: authMiddleware },
    async (request, reply) => {
      const { comment } = request.body as { comment: string };
      const { projectId } = request.params as { projectId: string };
      const { id: userId } = request.user as { id: string };

      try {
        await reportUseCase.createReport({
          comment,
          userId,
          projectId,
        });
        return reply.status(201).send();
      } catch (error) {
        return reply.status(500).send(error);
      }
    }
  );
}
