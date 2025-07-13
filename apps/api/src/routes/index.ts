import { BASE_PATH } from '../lib/constants';
import { createRouter } from '../lib/create-router';
import type { AppOpenAPI } from '../lib/types';
import health from './health';
import notes from './notes/notes.index';

export function registerRoutes(app: AppOpenAPI) {
  return app.route('/health', health).route('/notes', notes);
}

export const router = registerRoutes(createRouter().basePath(BASE_PATH));

export type Router = typeof router;
