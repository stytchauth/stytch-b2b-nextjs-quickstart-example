import { AdminPortalOrgSettings, AdminPortalB2BProducts } from '@stytch/nextjs/b2b/adminPortal'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { config, styles } from '@/lib/adminPortalConfig';

const Settings = () => {

  return (
    <AdminPortalOrgSettings config={config} styles={styles} />
  );
};

export default Settings;
