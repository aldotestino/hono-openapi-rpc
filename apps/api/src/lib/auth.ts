import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { customSession, openAPI } from 'better-auth/plugins';
import db from 'db';
import { account } from 'db/schema';
import { eq } from 'drizzle-orm';

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
    customSession(async ({ user, session }) => {
      const userAccount = await db
        .select()
        .from(account)
        .where(eq(account.userId, session.userId));

      return {
        provider: userAccount[0]?.providerId,
        user,
        session,
      };
    }),
  ],
});
