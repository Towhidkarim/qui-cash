import { Separator } from '@radix-ui/react-separator';
import React from 'react';
import AddForm from './add-form';

export default function Page() {
  return (
    <section className='mx-2 w-full'>
      <h1 className='my-2 text-lg font-semibold'>Add Funds to you wallet</h1>
      <Separator />
      <div>
        <AddForm />
      </div>
    </section>
  );
}
