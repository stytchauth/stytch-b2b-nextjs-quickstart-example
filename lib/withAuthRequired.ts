import { NextRequest, NextResponse } from 'next/server';
import loadStytch from './loadStytch';

export interface AuthenticatedRequest extends NextRequest {
  session?: any;
  user?: any;
}

export type AuthenticatedHandler = (req: AuthenticatedRequest) => Promise<NextResponse>;

export function withAuthRequired(handler: AuthenticatedHandler) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const client = loadStytch();
    
    const sessionToken = req.headers.get('authorization')?.replace('Bearer ', '') || 
                        req.cookies.get('stytch_session_jwt')?.value ||
                        req.cookies.get('stytch_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'No session token provided' },
        { status: 401 }
      );
    }

    try {
      const resp = await client.sessions.authenticate({
        session_token: sessionToken,
      });

      const factors = resp.session.authentication_factors;
      if (factors.length < 2) {
        return NextResponse.json(
          { error: 'Insufficient authentication factors' },
          { status: 401 }
        );
      }

      const methods = new Set(factors.map(factor => factor.delivery_method));
      if (methods.has('email') && !methods.has('knowledge')) {
        return NextResponse.json(
          { error: 'Multi-factor authentication required' },
          { status: 401 }
        );
      }

      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.session = resp.session;
      authenticatedReq.user = resp.session.member;

      return await handler(authenticatedReq);
    } catch (error: any) {
      return NextResponse.json(
        { error: error.details || 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}