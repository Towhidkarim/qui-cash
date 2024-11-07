import MileStone from '@/components/ui/milestone';
import SequenceTab from '@/components/ui/sequence-tab';
import React from 'react';

export default function Connect() {
  return (
    <section>
      <div>Connect</div>
      <br />
      <MileStone currentStep={2} totalSteps={4} />
      <br />
      {/* <SequenceTab /> */}
    </section>
  );
}
