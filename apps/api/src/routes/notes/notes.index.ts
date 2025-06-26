import { createRouter } from "../../lib/create-router";
import * as routes from "./notes.routes";
import * as handlers from "./notes.handlers";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.remove, handlers.remove);

export default router;