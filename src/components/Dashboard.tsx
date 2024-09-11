import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  useStytchMemberSession,
  useStytchOrganization,
} from '@stytch/nextjs/b2b';
import './Dashboard.css';

const Dashboard = () => {
  const { session, isInitialized } = useStytchMemberSession();
  const { organization } = useStytchOrganization();
  const router = useRouter();

  const role = useMemo(() => {
    return session?.roles.includes('stytch_admin') ? 'admin' : 'member';
  }, [session?.roles]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (isInitialized && !session) {
    return router.replace("/")
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        Hello! You&apos;re logged into{' '}
        <strong>{organization?.organization_name}</strong> with{' '}
        <strong>{role}</strong> permissions.
        <br></br>
        <br></br>
        Test out the <strong>Admin Portal UI</strong> for managing members, settings, SSO and SCIM.
      </div>
    </div>
  );
};

export default Dashboard;
