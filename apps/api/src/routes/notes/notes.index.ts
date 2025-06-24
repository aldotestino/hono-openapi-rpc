import { createRouter } from "../../lib/create-app";
import * as routes from "./notes.routes";
import * as handlers from "./notes.handlers";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create);

export default router;