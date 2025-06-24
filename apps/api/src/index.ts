import { configOpenApi } from "./lib/config-open-api"
import { registerRoutes } from "./routes"
import { createApp } from "./lib/create-app"

const app = registerRoutes(createApp());
configOpenApi(app);

export default {
  port: 4000,
  fetch: app.fetch
}