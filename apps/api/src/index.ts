import { createApp } from './lib/factory';
import { configOpenApi } from './lib/open-api';
import { registerRoutes } from './routes';

const app = registerRoutes(createApp());
configOpenApi(app);

const PORT = process.env.PORT || 4000;

export default {
  port: PORT,
  fetch: app.fetch,
};
