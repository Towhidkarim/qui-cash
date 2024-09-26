import { SessionContext } from '@/components/provider';
import { useContext } from 'react';

export const useSession = () => useContext(SessionContext);
