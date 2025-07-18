import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './schema',
  dialect: 'postgresql',
  dbCredentials: {
    // biome-ignore lint/style/noNonNullAssertion: DATABASE_URL is set in the .env file
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
});
