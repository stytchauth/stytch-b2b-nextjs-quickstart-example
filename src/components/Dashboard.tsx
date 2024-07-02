import { useMemo } from 'react';
import {
  useStytchMemberSession,
  useStytchOrganization,
} from '@stytch/nextjs/b2b';
import './Dashboard.css';

const Dashboard = () => {
  const { session, fromCache } = useStytchMemberSession();
  const { organization } = useStytchOrganization();

  const role = useMemo(() => {
    return session?.roles.includes('stytch_admin') ? 'admin' : 'member';
  }, [session?.roles]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        Hello! You&apos;re logged into{' '}
        <strong>{organization?.organization_name}</strong> with{' '}
        <strong>{role}</strong> permissions.
      </div>
    </div>
  );
};

export default Dashboard;
