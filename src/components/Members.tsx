import { AdminPortalMemberManagement } from '@stytch/nextjs/b2b/adminPortal'
import { config, styles } from '@/lib/adminPortalConfig';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Members = () => {

  return (
    <AdminPortalMemberManagement config={config} styles={styles} />
  );
};

export default Members;
