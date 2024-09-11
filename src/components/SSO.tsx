import { AdminPortalSSO } from '@stytch/nextjs/b2b/adminPortal'
import '@fortawesome/fontawesome-free/css/all.min.css';

const SSO = () => {
  const styles = {
    fontFamily: "Courier New",
  };

  return (
      <AdminPortalSSO styles={styles} />
  );
};

export default SSO;