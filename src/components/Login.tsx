'use client';

import React from 'react';
import { StytchB2B } from '@stytch/nextjs/b2b';
import { B2BProducts, AuthFlowType } from '@stytch/vanilla-js/b2b';
import './Login.css';

/*
 * Login configures and renders the StytchLogin component which is a prebuilt UI component for auth powered by Stytch.
 *
 * This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
 * https://stytch.com/docs/sdks/javascript-sdk#ui-configs.
 */
const Login = () => {
  const styles = {
    container: {
      width: '100%',
    },
    buttons: {
      primary: {
        backgroundColor: '#4A37BE',
        borderColor: '#4A37BE',
      },
    },
  };

  const discoveryConfig = {
    authFlowType: AuthFlowType.Discovery,
    products: [B2BProducts.emailMagicLinks],
    sessionOptions: {
      sessionDurationMinutes: 60,
    },
  };

  return (
    <div className="centered-login">
      <StytchB2B config={discoveryConfig} styles={styles} />
    </div>
  );
};

export default Login;
