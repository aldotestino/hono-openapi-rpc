import { describe, expect, test } from 'bun:test';
import { testClient } from 'hono/testing';
import { createTestApp } from '../lib/factory';
import healthRouter from './health';

describe('❤️ Health', () => {
  const client = testClient(createTestApp(healthRouter));

  test('should return a health check', async () => {
    const response = await client.api.health.$get();
    const { status } = await response.json();

    expect(response.status).toBe(200);
    expect(status).toBe('ok');
  });
});
