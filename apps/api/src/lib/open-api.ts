import { Scalar } from '@scalar/hono-api-reference';
import { auth } from './auth';
import { BASE_PATH } from './constants';
import type { AppOpenAPI } from './types';

export function configOpenApi(app: AppOpenAPI) {
  app.doc('/doc/api', {
    openapi: '3.0.0',
    info: {
      version: '0.0.1',
      title: 'Notes API',
    },
  });

  app.get('/doc/auth', async (c) => {
    const authDoc = await auth.api.generateOpenAPISchema();
    return c.json(authDoc);
  });

  app.get(
    '/reference',
    Scalar({
      sources: [
        {
          url: `${BASE_PATH}/doc/api`,
          title: 'Api',
        },
        {
          url: `${BASE_PATH}/doc/auth`,
          title: 'Auth',
        },
      ],
      defaultHttpClient: {
        targetKey: 'js',
        clientKey: 'fetch',
      },
    })
  );
}
