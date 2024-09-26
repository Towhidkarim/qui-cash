'use server';

import { z } from 'zod';
import { hash } from '@node-rs/argon2';
import { UserTypeSchema } from '../type-schema';
import { generateIdFromEntropySize } from 'lucia';
import { db } from '../db/database';
import { accountsTable, userTable } from '../db/schema';
import { eq } from 'drizzle-orm';

export default async function SignUpAction({
  userData,
}: {
  userData: z.infer<typeof UserTypeSchema>;
}) {
  const parsedResult = UserTypeSchema.safeParse(userData);
  if (!parsedResult.success) return { ok: false, message: 'Parsing Failed' };
  const {
    email,
    firstName,
    lastName,
    passWord,
    address,
    mobileNumber,
    nid,
    postalCode,
    state,
    dateOfBirth,
  } = parsedResult.data;

  try {
    const res = await db
      .select({ email: userTable.email })
      .from(userTable)
      .where(eq(userTable.email, email));
    if (res.length > 0)
      return { ok: false, message: 'User with email already exists' };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'Something Went Wrong' };
  }

  const passwordHash = await hash(passWord, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const id = generateIdFromEntropySize(10);

  try {
    await db.insert(userTable).values({
      userID: id,
      email,
      username: firstName,
      passwordHash,
      address,
      mobileNumber,
      dateOfBirth,
      firstName,
      lastName,
      nid,
      postalCode,
      state,
    });
    await db.insert(accountsTable).values({ ownerID: id, balance: 5 });

    return { ok: true, message: 'Signed Up Succesfully!' };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'Something Went Wrong' };
  }
}
