import { getCookie } from '@/utils/cookies';
import { NextApiRequest } from 'next';

export const checkUserAuthenticated = (): boolean => {
  
  const token = getCookie('token');
  
  return !!token;
}