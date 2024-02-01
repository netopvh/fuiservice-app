import { NextRequest, NextResponse } from 'next/server'
import { checkUserAuthenticated } from './functions/check-user-authenticated'
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { APP_ROUTES } from './constants/app-routes';

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/home/:path*',
  ]
  // Don't run the middleware if the user is already authenticated
  // and is trying to access the login page
  // exclude: ['/dashboard/login'],
}
 
export function middleware(req: NextRequest) {

    const cookies: RequestCookies = req.cookies;
    const authHeader = cookies.get('token')?.value;

    //check public routes
    if(
      req.nextUrl.pathname.valueOf() === '/' ||
      req.nextUrl.pathname.startsWith(APP_ROUTES.public.login) ||
      req.nextUrl.pathname.startsWith(APP_ROUTES.public.register) ||
      req.nextUrl.pathname.startsWith(APP_ROUTES.public.forgotPassword) ||
      req.nextUrl.pathname.startsWith(APP_ROUTES.public.resetPassword)
      ) {
        if(authHeader) {
          const redirectUrl = new URL(APP_ROUTES.private.dashboard, req.nextUrl.origin).toString();

          return NextResponse.redirect(redirectUrl);
        }
      }

      if (!authHeader && 
        !req.nextUrl.pathname.startsWith(APP_ROUTES.public.login) &&
        !req.nextUrl.pathname.startsWith(APP_ROUTES.public.register) &&
        !req.nextUrl.pathname.startsWith(APP_ROUTES.public.forgotPassword) &&
        !req.nextUrl.pathname.startsWith(APP_ROUTES.public.resetPassword)
        ) {
        const redirectUrl = new URL(APP_ROUTES.public.login, req.nextUrl.origin).toString();
        return NextResponse.redirect(redirectUrl);
      }  

    return NextResponse.next()
}