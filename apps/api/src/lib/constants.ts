import type { User } from 'better-auth';

export const BASE_PATH = '/api' as const;
export const STATUS_OK = 'ok' as const;

export const STATIC_FILE_REGEX =
  /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|map)$/;

export const TEST_USER: User = {
  id: '1',
  name: 'John Doe',
  emailVerified: true,
  email: 'john.doe@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};
