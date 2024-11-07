'use server';

import { eq } from 'drizzle-orm';
import { validateRequest } from '../db/auth';
import { db } from '../db/database';
import { userTable } from '../db/schema';
import { redirect } from 'next/navigation';

export default async function GetUserInfoAction() {
  const { user } = await validateRequest();
  if (!user?.id) redirect('/');
  try {
    const userData = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, user.id))
      .limit(1);
    return userData[0];
  } catch (e) {
    console.log(e);
    return null;
  }
}
