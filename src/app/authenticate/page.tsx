'use client';

import Login from '@/src/components/Login';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStytchMemberSession } from '@stytch/nextjs/b2b';

export default function AuthenticatePage() {
  const { session, isInitialized } = useStytchMemberSession();
  const router = useRouter();

  const alreadyLoggedInRef = useRef<boolean>();
  const hasSession = !!session;
  useEffect(() => {
    if (isInitialized && alreadyLoggedInRef.current === undefined) {
      alreadyLoggedInRef.current = hasSession;

      if (hasSession) {
        // The user was already logged in, so we can redirect them immediately
        router.replace('/dashboard');
      }
    }
  }, [isInitialized, hasSession, router]);

  return <Login />;
}
