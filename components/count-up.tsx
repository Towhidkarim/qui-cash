'use client';
import CountUp from 'react-countup';
import { CountUpProps } from 'react-countup';

// type props =

export default function CountUpAnimation(props: CountUpProps) {
  return (
    <CountUp {...props} duration={1} separator=',' decimals={2} decimal='.' />
  );
}
