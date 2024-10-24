'use server';

import { db } from '@/lib/db/database';
import { accountsTable, userTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function FindUserNameAction({
  mobileNumber,
  accountID,
}:
  | { mobileNumber: string; accountID: undefined }
  | { mobileNumber: undefined; accountID: string }) {
  try {
    let data;
    if (mobileNumber) {
      data = await db
        .select({
          accountID: accountsTable.accountID,
          username: userTable.username,
          accountType: accountsTable.accountType,
        })
        .from(userTable)
        .innerJoin(accountsTable, eq(accountsTable.ownerID, userTable.id))
        .where(eq(userTable.mobileNumber, mobileNumber));
    } else if (accountID && !mobileNumber) {
      data = await db
        .select({
          accountID: accountsTable.accountID,
          username: userTable.username,
          accountType: accountsTable.accountType,
        })
        .from(userTable)
        .innerJoin(accountsTable, eq(accountsTable.ownerID, userTable.id))
        .where(eq(accountsTable.accountID, accountID));
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
