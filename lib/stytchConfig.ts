import { IBM_Plex_Sans } from '@next/font/google';
import { AdminPortalB2BProducts } from '@stytch/nextjs/b2b/adminPortal'
import { B2BProducts, AuthFlowType, B2BOAuthProviders } from '@stytch/vanilla-js/b2b';

const customFont = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
});

type Role = {
  role_id: string;
  description: string;
}

export const adminPortalConfig = {
  allowedAuthMethods: [
    AdminPortalB2BProducts.emailMagicLinks,
    AdminPortalB2BProducts.sso,
    AdminPortalB2BProducts.oauthGoogle
  ],
  getRoleDescription: (role: Role) => {
    if (role.role_id == 'stytch_admin') {
      return 'Able to manage settings and members'
    } else if (role.role_id == 'stytch_member') {
      return 'Able to view settings and members, but cannot edit'
    } else {
      return role.description;
    }
  },
  getRoleDisplayName: (role: Role) => {
    if (role.role_id == 'stytch_admin') {
      return 'Admin'
    } else if (role.role_id == 'stytch_member') {
      return 'Member'
    } else {
      return role.role_id
    }
  }
}

export const discoveryConfig = {
  authFlowType: AuthFlowType.Discovery,
  products: [B2BProducts.oauth, B2BProducts.emailMagicLinks],
  sessionOptions: {
    sessionDurationMinutes: 60,
  },
  oauthOptions: {
    providers: [{type: B2BOAuthProviders.Google}]
  }
};

export const adminPortalStyles = {
  fontFamily: customFont.style.fontFamily,
}

export const discoveryStyles = {
  container: {
    width: '500px',
  },
  fontFamily: customFont.style.fontFamily,
};