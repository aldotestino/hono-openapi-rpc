import { createRouter } from '../../lib/factory';
import {
  create as createHandler,
  list as listHandler,
  remove as removeHandler,
} from './notes.handlers';
import {
  create as createRoute,
  list as listRoute,
  remove as removeRoute,
} from './notes.routes';

const router = createRouter()
  .openapi(listRoute, listHandler)
  .openapi(createRoute, createHandler)
  .openapi(removeRoute, removeHandler);

export default router;
