import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === '/' || pathname == null) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    
    if (pathname != '/login' && pathname != '/cadastro') {
        const token = request.cookies.get('token')?.value;
        console.log('token ' + token)

        if (!token) {
            console.log('caiu??')
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const secret = process.env.JWT_SECRET;

            if (!secret) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
            jwt.verify(token ,secret);
        }catch(error) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|css|js|ico)).*)',
  ],
}
