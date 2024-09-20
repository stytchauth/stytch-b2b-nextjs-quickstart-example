import { AdminPortalB2BProducts } from '@stytch/nextjs/b2b/adminPortal'

type Role = {
  role_id: string;
  description: string;
}

export const config = {
  allowedAuthMethods: [AdminPortalB2BProducts.emailMagicLinks, AdminPortalB2BProducts.sso, AdminPortalB2BProducts.oauthGoogle],
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

export const styles = {
  fontFamily: 'Courier New',
}