'use client';

import { usePathname } from 'next/navigation';

export default function NavTitle() {
  const pathName = usePathname();
  const pathTitle = pathName.split('/');
  return <div className='capitalize'>{pathTitle[pathTitle.length - 1]}</div>;
}
