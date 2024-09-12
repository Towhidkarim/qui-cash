'use client';
import CountUp from 'react-countup';

export default function CountUpAnimation({ value }: { value: number }) {
  return (
    <CountUp
      start={0}
      end={value}
      duration={1}
      separator=','
      decimals={2}
      decimal='.'
    />
  );
}
