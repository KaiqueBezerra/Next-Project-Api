import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../services/auth-service";

export function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
  done: Function
) {
  const token = request.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return reply
      .status(401)
      .send({ error: "Unauthorized - No Token Provided" });
  }

  try {
    const decoded = AuthService.verifyToken(token);

    request.user = { id: decoded.id }; // Adiciona user.id ao request
    done();
  } catch (error) {
    return reply.status(401).send({ error: "Unauthorized - Invalid Token" });
  }
}
