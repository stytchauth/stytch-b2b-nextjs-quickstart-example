import { NextResponse } from 'next/server';
import { withAuthRequired, AuthenticatedRequest } from '../../../../lib/withAuthRequired';

async function protectedHandler(req: AuthenticatedRequest) {
  return NextResponse.json({
    message: 'Access granted to protected resource',
    user: {
      member_id: req.user?.member_id,
      email_address: req.user?.email_address,
      organization_id: req.session?.organization_id,
    },
    session: {
      session_id: req.session?.session_id,
      authentication_factors: req.session?.authentication_factors?.map((factor: any) => ({
        type: factor.type,
        delivery_method: factor.delivery_method,
      })),
    },
  });
}

export const GET = withAuthRequired(protectedHandler);
export const POST = withAuthRequired(protectedHandler);