import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from './database';
import { cookies } from 'next/headers';
import { cache } from 'react';
import type { Session, User } from 'lucia';
import { sessionTable, userTable } from './schema';
// import type { DatabaseUser } from "./db";

// import { webcrypto } from "crypto";
// globalThis.crypto = webcrypto as Crypto;

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      email: attributes.email,
    };
  },
});

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}
    return result;
  },
);

interface DatabaseUser {
  id: string;
  username: string;
  email: string;
  password_hash: string;
}
declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, 'id'>;
  }
}