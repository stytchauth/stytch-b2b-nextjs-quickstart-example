import { AdminPortalOrgSettings, AdminPortalB2BProducts } from '@stytch/nextjs/b2b/adminPortal'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Settings = () => {
  const styles = {
    fontFamily: "Courier New",
  };
  const config = {allowedAuthMethods: [AdminPortalB2BProducts.emailMagicLinks, AdminPortalB2BProducts.sso]};

  return (
      <AdminPortalOrgSettings config={config} styles={styles} />
  );
};

export default Settings;
