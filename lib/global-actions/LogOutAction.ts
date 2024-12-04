'use server';

import { cookies } from 'next/headers';
import { lucia, validateRequest } from '../db/auth';

export default async function () {
  const { session } = await validateRequest();
  if (session?.id) await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
}
