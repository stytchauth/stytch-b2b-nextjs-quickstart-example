'use client';

import React from 'react';
import {useRouter} from 'next/navigation';
import {StytchB2B, useStytchOrganization} from '@stytch/nextjs/b2b';
import {AuthFlowType, B2BProducts, StytchEventType} from '@stytch/vanilla-js';
import {discoveryConfig, discoveryStyles} from '@/lib/stytchConfig';
import './Login.css';

/*
 * Login configures and renders the StytchLogin component which is a prebuilt UI component for auth powered by Stytch.
 *
 * This component accepts style, config, and callbacks props. To learn more about possible options review the documentation at
 * https://stytch.com/docs/b2b/sdks/ui-config
 */

const Login = () => {

    const router = useRouter();

    const [isEMLOTP, setIsEMLOTP] = React.useState(false);
    const {organization} = useStytchOrganization();

    return (
        <div className="centered-login">
            {!isEMLOTP && <StytchB2B
              config={discoveryConfig}
              styles={discoveryStyles}
              callbacks={{
                  onEvent: (event) => {
                      if (event.type === StytchEventType.AuthenticateFlowComplete) {
                          // TODO - check to see if the user has 1 factor
                          // if so, prompt email OTP flow
                          // router.replace('/dashboard');
                          setIsEMLOTP(true)
                      }
                  },
              }}
            />}
            {isEMLOTP && <StytchB2B
              config={{
                  products: [B2BProducts.emailOtp],
                  authFlowType: AuthFlowType.Organization,
                  sessionOptions: {sessionDurationMinutes: 60},
                  organizationSlug: organization?.organization_slug,
              }}
              styles={discoveryStyles}
              callbacks={{
                  onEvent: (event) => {
                      if (event.type === StytchEventType.AuthenticateFlowComplete) {
                          router.replace('/dashboard');
                      }
                  },
              }}
            />}
        </div>
    );
};

export default Login;
