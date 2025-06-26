import { BASE_PATH } from "./constants";
import type { AppOpenAPI } from "./types";
import { Scalar } from "@scalar/hono-api-reference";

export function configOpenApi(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "0.0.1",
      title: "Notes API",
    },
  });

  app.get(
    "/reference",
    Scalar({
      url: `${BASE_PATH}/doc`,
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
    }),
  );
}