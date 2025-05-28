import { NextRequest, NextResponse } from 'next/server';
import loadStytch from '../../../../../lib/loadStytch';

export async function GET(req: NextRequest) {
  const client = loadStytch();
  const { searchParams } = new URL(req.url);
  const sso_token = searchParams.get('token');

  if (!sso_token) {
    return NextResponse.json({ error: 'Missing token parameter' }, { status: 400 });
  }

  const ssoResp = await client.sso.authenticate({
    sso_token,
    session_duration_minutes: 60,
  });

  await client.sessions.authenticate({
    session_token: ssoResp.session_token,
    session_duration_minutes: 60,
    session_custom_claims: {
      auth_method: 'sso',
      mfa_required: false,
      mfa_completed: true,    
    },
  });

  return NextResponse.json({
    session_token: ssoResp.session_token,
    session_jwt:   ssoResp.session_jwt,
  });
}