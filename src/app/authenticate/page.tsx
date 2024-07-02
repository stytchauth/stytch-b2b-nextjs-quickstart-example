'use client';

import Login from '@/src/components/Login';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStytchMember } from '@stytch/nextjs/b2b';

export default function AuthenticatePage() {
  const { member, isInitialized } = useStytchMember();
  const router = useRouter();

  // If the Stytch SDK no longer has a User then redirect to login; for example after logging out.
  useEffect(() => {
    if (isInitialized && member) {
      router.replace('/dashboard');
    }
  }, [member, isInitialized, router]);

  return <Login />;
}
