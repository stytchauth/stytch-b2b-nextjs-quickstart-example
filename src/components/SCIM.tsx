import { AdminPortalSCIM } from '@stytch/nextjs/b2b/adminPortal'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { styles } from '@/lib/adminPortalConfig';

const SCIM = () => {
  return (
    <AdminPortalSCIM styles={styles} />
  );
};

export default SCIM;
