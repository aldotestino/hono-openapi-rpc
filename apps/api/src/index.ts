import { configOpenApi } from './lib/config-open-api';
import { createApp } from './lib/create-app';
import { registerRoutes } from './routes';

const app = registerRoutes(createApp());
configOpenApi(app);

const PORT = process.env.PORT || 4000;

export default {
  port: PORT,
  fetch: app.fetch,
};
