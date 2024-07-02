'use client';

import './globals.css';
import './layout.css';

import { ReactNode } from 'react';
import StytchProvider from '../components/StytchProvider';
import Link from 'next/link';
import { useStytchB2BClient, useStytchMemberSession } from '@stytch/nextjs/b2b';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StytchProvider>
      <html lang="en">
        <title>Stytch Next.js App Router Example</title>
        <meta
          name="description"
          content="An example Next.js App Router application using Stytch for authentication"
        />
        <body>
          <div className="page-container">
            <SideNav />
            <main className="content-container">{children}</main>
          </div>
        </body>
      </html>
    </StytchProvider>
  );
}

const SideNav = () => {
  const stytch = useStytchB2BClient();
  const { session } = useStytchMemberSession();
  const router = useRouter();

  const handleLogOut = () => {
    stytch.session.revoke().then(() => {
      router.replace('/');
    });
  };

  if (!session) {
    return null;
  }
  return (
    <nav className="sidebar">
      <div className="sidebar-top-links">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/settings">Organization Settings</Link>
        <Link href="/profile">Profile</Link>
      </div>
      <div className="logout-link" onClick={handleLogOut}>
        Log out
      </div>
    </nav>
  );
};
