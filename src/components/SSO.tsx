import { AdminPortalSSO } from '@stytch/nextjs/b2b/adminPortal'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { adminPortalConfig, adminPortalStyles } from '@/lib/stytchConfig';

/*
 * SSO configures and renders the Stytch AdminPortalSSO pre-built UI component for setting up and managing SAML and OIDC SSO Connections.
 *
 * This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
 * https://stytch.com/docs/b2b/sdks/admin-portal/sso
 */

const SSO = () => {

  return (
    <AdminPortalSSO config={adminPortalConfig} styles={adminPortalStyles} />
  );
};

export default SSO;