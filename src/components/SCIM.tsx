import { AdminPortalSCIM } from '@stytch/nextjs/b2b/adminPortal'
import '@fortawesome/fontawesome-free/css/all.min.css';

const SCIM = () => {
  const styles = {
    fontFamily: "Courier New",
  };

  return (
      <AdminPortalSCIM styles={styles} />
  );
};

export default SCIM;