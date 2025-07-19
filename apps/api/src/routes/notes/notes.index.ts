import { createRouter } from '../../lib/factory';
import {
  create as createHandler,
  list as listHandler,
  remove as removeHandler,
  stats as statsHandler,
} from './notes.handlers';
import {
  create as createRoute,
  list as listRoute,
  remove as removeRoute,
  stats as statsRoute,
} from './notes.routes';

const router = createRouter()
  .openapi(listRoute, listHandler)
  .openapi(createRoute, createHandler)
  .openapi(removeRoute, removeHandler)
  .openapi(statsRoute, statsHandler);

export default router;
