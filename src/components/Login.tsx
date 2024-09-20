'use client';

import React from 'react';
import { StytchB2B } from '@stytch/nextjs/b2b';
import { B2BProducts, AuthFlowType, OAuthProviders, B2BOAuthProviders } from '@stytch/vanilla-js/b2b';
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
      width: '600px',
    },
    fontFamily: "Baskerville",
  };

  const discoveryConfig = {
    authFlowType: AuthFlowType.Discovery,
    products: [B2BProducts.emailMagicLinks, B2BProducts.oauth],
    sessionOptions: {
      sessionDurationMinutes: 60,
    },
    oauthOptions: {
      providers: [{type: B2BOAuthProviders.Google}]
    }
  };

  return (
    <div className="centered-login">
      <StytchB2B config={discoveryConfig} styles={styles} />
    </div>
  );
};

export default Login;
