'use client';

import React from 'react';
import { StytchB2B } from '@stytch/nextjs/b2b';
import { discoveryConfig, discoveryStyles } from '@/lib/stytchConfig';
import './Login.css';

/*
 * Login configures and renders the StytchLogin component which is a prebuilt UI component for auth powered by Stytch.
 *
 * This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
 * https://stytch.com/docs/b2b/sdks/ui-config
 */

const Login = () => {

  return (
    <div className="centered-login">
      <StytchB2B config={discoveryConfig} styles={discoveryStyles} />
    </div>
  );
};

export default Login;
