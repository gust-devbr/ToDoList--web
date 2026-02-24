import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    const publicPaths = ['/api/public/login', '/api/public/register'];
    if (publicPaths.some(path => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    const authHeader = req.headers.get('authorization');
    if (!authHeader) return new NextResponse(JSON.stringify({ message: 'Token não fornecido' }), { status: 401 });

    const token = authHeader.split(' ')[1];
    if (!token) return new NextResponse(JSON.stringify({ message: 'Token inválido' }), { status: 401 });

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;

        return NextResponse.next();
    } catch (err) {
        return new NextResponse(JSON.stringify({ message: 'Token inválido ou expirado' }), { status: 401 });
    }
};

export const config = {
    matcher: ['/api/:path*'],
};