import { configOpenApi } from "./lib/config-open-api"
import { registerRoutes } from "./routes"
import { createApp } from "./lib/create-app"
import { BASE_PATH } from "./lib/constants";

const app = registerRoutes(createApp());
configOpenApi(app);

export default {
  port: 4000,
  fetch: app.fetch
}