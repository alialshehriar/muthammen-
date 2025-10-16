import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user has session token
  const sessionToken = request.cookies.get('next-auth.session-token') || 
                       request.cookies.get('__Secure-next-auth.session-token');
  
  const isLoggedIn = !!sessionToken;
  
  // Redirect logged-in users from landing page to /home
  if (pathname === '/' && isLoggedIn) {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  
  // Protected routes that require authentication
  const protectedRoutes = [
    '/home', 
    '/dashboard', 
    '/wallet', 
    '/profile', 
    '/negotiations', 
    '/projects/create', 
    '/projects/edit',
    '/settings',
    '/messages'
  ];
  
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Redirect non-logged-in users from protected routes to signin page
  if (isProtectedRoute && !isLoggedIn) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/home',
    '/dashboard',
    '/wallet',
    '/profile',
    '/negotiations/:path*',
    '/projects/create',
    '/projects/edit/:path*',
    '/settings/:path*',
    '/messages/:path*',
  ],
};

