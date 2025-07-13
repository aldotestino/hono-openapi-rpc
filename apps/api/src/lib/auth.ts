import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';
import db from 'db';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      // biome-ignore lint/style/noNonNullAssertion: GITHUB_CLIENT_ID is set in the .env file
      clientId: process.env.GITHUB_CLIENT_ID!,
      // biome-ignore lint/style/noNonNullAssertion: GITHUB_CLIENT_SECRET is set in the .env file
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [
    openAPI({
      disableDefaultReference: true,
    }),
  ],
});
