import { AdminPortalMemberManagement } from '@stytch/nextjs/b2b/adminPortal'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { config, styles } from '@/lib/adminPortalConfig';

const Members = () => {
  return (
    <AdminPortalMemberManagement config={config} styles={styles} />
  );
};

export default Members;
