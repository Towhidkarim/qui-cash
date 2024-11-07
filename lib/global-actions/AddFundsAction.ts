'use server';

import { redirect } from 'next/navigation';
import { validateRequest } from '../db/auth';
import { db } from '../db/database';
import { accountsTable } from '../db/schema';
import { sql } from 'drizzle-orm';

export default async function AddFundsAction({
  accountID,
  amount,
}: {
  accountID: string;
  amount: number;
}) {
  const { user } = await validateRequest();
  if (!user) redirect('/');

  try {
    await db
      .update(accountsTable)
      .set({ balance: sql`${accountsTable.balance} + ${amount}` });
    return { ok: true, message: 'Succesfully Added Funds' };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'Something Went Wrong' };
  }
}
