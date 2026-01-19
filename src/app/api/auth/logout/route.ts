import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const cookieStore = await cookies();

    // Clear the auth token
    cookieStore.set('auth_token', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
    });

    // Dynamic redirect based on the request URL
    const requestUrl = new URL(request.url);
    const redirectUrl = new URL('/login', requestUrl.origin);

    // Use 303 See Other to force Method GET on the redirect
    return NextResponse.redirect(redirectUrl, { status: 303 });
}
