import fastify, { FastifyInstance } from "fastify";
import { projectRoutes } from "./routes/projects-routes";
import { fastifyCors } from "@fastify/cors";
import { userRoutes } from "./routes/users-routes";
import { authRoutes } from "./routes/auth-routes";

const app: FastifyInstance = fastify({
  logger: true,
});

app.register(fastifyCors, { origin: "*" });

app.register(authRoutes, { prefix: "/auth" });
app.register(userRoutes, { prefix: "/users" });
app.register(projectRoutes, { prefix: "/projects" });

app.listen({ port: 3100, host: "0.0.0.0" }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log("Server running on port 3100");
});
