'use server';

import { redirect } from 'next/navigation';
import { validateRequest } from '../db/auth';
import { routes } from '../constants';
import { db } from '../db/database';
import { userTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { verify } from '@node-rs/argon2';
import { lucia } from '../db/auth';
import { cookies } from 'next/headers';

export default async function SignInAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { user } = await validateRequest();
  if (user?.email) redirect(routes.dashboard);

  try {
    const res = await db
      .select({
        id: userTable.id,
        email: userTable.email,
        passwordHash: userTable.passwordHash,
      })
      .from(userTable)
      .where(eq(userTable.email, email));
    if (res.length === 0)
      return { ok: false, message: 'User with email does not exist!' };
    else {
      const validPassword = await verify(res[0].passwordHash, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });
      if (!validPassword) return { ok: false, message: 'Incorrect Password!' };

      const session = await lucia.createSession(res[0].id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    return { ok: true, message: 'Sign In Succesful!' };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'Something Went Wrong!' };
  }
}
