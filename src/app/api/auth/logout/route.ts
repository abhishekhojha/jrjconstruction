import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    const cookieStore = await cookies();

    // Clear the auth token
    cookieStore.set('auth_token', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
    });

    // For a form submission redirect (if using native form action)
    // using NextResponse.redirect would work if it was a server action or pure API.
    // However, since it's an API route called via form action, we can redirect.
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
}
