'use client';
import MileStone from '@/components/ui/milestone';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CalendarHeart, HandCoins } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ModeChoose from './mode-choose';
import SequenceTab, { clamp } from '@/components/ui/sequence-tab';
import TransferCredential from './transfer-credential';
import SelectRecipient from './select-recipient';
import InitiateTransfer from './initiate-transfer';

export type TTransferMode = 'transfer' | 'payment' | 'bill';

export default function TransferSection() {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(0);
  const [transferMode, setTransferMode] = useState<TTransferMode>('transfer');
  const [transferCredential, setTransferCredential] = useState('');

  const previousTab = () => {
    setCurrentStep((prev) => clamp(0, prev - 1, totalSteps - 1));
  };
  const nextTab = () => {
    setCurrentStep((prev) => clamp(0, prev + 1, totalSteps - 1));
  };
  return (
    <div>
      <h1 className='text-center text-xl font-semibold'>Transfer Funds</h1>
      <MileStone
        className='my-3 w-4/5'
        currentStep={currentStep + 1}
        totalSteps={totalSteps}
      />
      <h2 className='text-center font-light'>{`Step ${currentStep + 1} of ${totalSteps}`}</h2>
      <Card className='mx-auto my-5 w-full max-w-[400px]'>
        <SequenceTab
          className=''
          currentStep={currentStep}
          tabs={[
            <ModeChoose setMode={setTransferMode} />,
            <TransferCredential
              setCredential={setTransferCredential}
              transferType={transferMode}
            />,
            <SelectRecipient
              credential={transferCredential}
              currentTab={currentStep}
              selfTabIndex={2}
              transferMode={transferMode}
            />,
            <InitiateTransfer />,
          ]}
        />
        <CardFooter className='mt-5 flex flex-row justify-between'>
          <Button
            disabled={currentStep === 0}
            className=''
            onClick={() => previousTab()}
          >
            <ArrowLeft />
          </Button>
          <Button
            disabled={currentStep === totalSteps - 1}
            className=''
            onClick={() => nextTab()}
          >
            <ArrowRight />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
