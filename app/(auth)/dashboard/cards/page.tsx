import MileStone from '@/components/ui/milestone';
import SequenceTab from '@/components/ui/sequence-tab';
import React from 'react';
import CreditCard from '../components/credit-card';
import { validateRequest } from '@/lib/db/auth';
import CardSection from './card-section';

export default async function Page() {
  const { user } = await validateRequest();
  return (
    <section>
      <h1 className='text-xl font-semibold'>Cards</h1>
      <div className='my-5 grid grid-cols-1 place-items-center gap-6 lg:grid-cols-2'>
        <CardSection
          userName={user?.username ?? ''}
          cardNumber='458932679851'
          balance={100}
        />
        <CardSection
          userName={user?.username ?? ''}
          cardNumber='458245962544'
          balance={150}
        />
      </div>
    </section>
  );
}
