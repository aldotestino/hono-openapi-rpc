import { createRouter } from '../../lib/create-router';
import { create, list, remove } from './notes.handlers';
import {
  create as createRoute,
  list as listRoute,
  remove as removeRoute,
} from './notes.routes';

const router = createRouter()
  .openapi(listRoute, list)
  .openapi(createRoute, create)
  .openapi(removeRoute, remove);

export default router;
