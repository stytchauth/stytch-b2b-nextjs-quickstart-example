import { AdminPortalSSO } from '@stytch/nextjs/b2b/adminPortal'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { config, styles } from '@/lib/adminPortalConfig';

const SSO = () => {
  return (
    <AdminPortalSSO config={config} styles={styles} />
  );
};

export default SSO;
