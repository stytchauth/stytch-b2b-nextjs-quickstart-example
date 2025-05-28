import { NextRequest, NextResponse } from 'next/server';
import loadStytch from '../../../../../lib/loadStytch';

export async function POST(req: NextRequest) {
  const client = loadStytch();
  const { email, code, intermediate_session_token } = await req.json();

  const otpResp = await client.otps.email.discovery.authenticate({
    email_address: email,
    code,
  });

  const final = await client.sessions.authenticate({
    intermediate_session_token,
    session_duration_minutes: 60,
    session_custom_claims: {
      auth_method: 'password_email_otp',
      mfa_required: true,
      mfa_completed: true,
    },
  });

  return NextResponse.json({
    session_token: final.session_token,
    session_jwt:   final.session_jwt,
  });
}