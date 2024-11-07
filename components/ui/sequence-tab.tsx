'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from './button';

export const clamp = (min: number, value: number, max: number) =>
  value < min ? 0 : value > max ? max : value;

export default function SequenceTab({
  tabs,
  currentStep,
  className,
}: {
  currentStep: number;
  tabs: React.ReactNode[];
  className?: string;
}) {
  // const tabs = ['tab one', 'tab two', 'tab three'];
  // const [currentStep, setCurrentStep] = useState(0);
  const currentStepClamped = clamp(0, currentStep, tabs.length - 1);
  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className={cn(
          'flex flex-row transition',
          //   `w-[${tabs.length * 100}%] -translate-x-[${(currentStep * 100) / tabs.length}%]`,
        )}
        style={{
          width: `${tabs.length * 100}%`,
          translateX: `-${(currentStepClamped * 100) / tabs.length}%`,
        }}
      >
        {tabs.map((item, index) => (
          <div key={index} className={cn('', `w-full`)}>
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
