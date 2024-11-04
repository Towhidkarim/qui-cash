'use client';
import React, { useState } from 'react';
import { Progress } from './progress';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function MileStone({
  className,
  totalSteps,
  currentStep,
}: {
  className?: string;
  totalSteps: number;
  currentStep: number;
}) {
  return (
    <div className={cn('relative mx-auto w-36', className)}>
      {new Array(totalSteps).fill(0).map((item, index) => (
        <motion.div
          key={index}
          className='absolute top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary backdrop-blur-sm'
          style={{
            left: `${((index + 1) * 100) / totalSteps}%`,
            translateY: '-50%',
            translateX: '-50%',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: currentStep >= index + 1 ? 1 : 0 }}
          transition={{ delay: 0.25 }}
        ></motion.div>
      ))}
      <Progress className='' value={(currentStep * 100) / totalSteps} />
    </div>
  );
}
