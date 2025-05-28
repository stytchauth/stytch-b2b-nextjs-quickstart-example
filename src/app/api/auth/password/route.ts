import { NextRequest, NextResponse } from 'next/server';
import loadStytch from '../../../../../lib/loadStytch';

export async function POST(req: NextRequest) {
  const client = loadStytch();
  const { email, password } = await req.json();

  const pwdResp = await client.passwords.authenticate({
    email_address: email,
    organization_id: 'organization-test-07971b06-ac8b-4cdb-9c15-63b17e653931',
    password,
    session_duration_minutes: 60,
  });

  if (pwdResp.mfa_required) {
    await client.otps.email.discovery.send({ 
      email_address: email,
    });

    return NextResponse.json({
      status: 'OTP_REQUIRED',
      intermediate_session_token: pwdResp.intermediate_session_token,
    });
  }

  await client.sessions.authenticate({              
    session_token: pwdResp.session_token,
    session_duration_minutes: 60,
    session_custom_claims: {
      auth_method: 'password',
      mfa_required: false,
      mfa_completed: true,
    },
  });

  return NextResponse.json({
    session_token: pwdResp.session_token,
    session_jwt:   pwdResp.session_jwt,
  });
}