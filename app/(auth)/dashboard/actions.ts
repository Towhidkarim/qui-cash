'use server';

import { routes } from '@/lib/constants';
import { validateRequest } from '@/lib/db/auth';
import { db } from '@/lib/db/database';
import { accountsTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export default async function GetAccountInfoAction() {
  const { user } = await validateRequest();
  if (!user) redirect(routes.signin);

  const accountInfo = await db
    .select()
    .from(accountsTable)
    .where(eq(accountsTable.ownerID, user.id));
}
