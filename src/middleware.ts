import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { GAME_RESULT_COOKIE } from '@/features/game/constants';
import { AppLink } from '@/shared/types';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === AppLink.Result) {
        const gameResult = request.cookies.get(GAME_RESULT_COOKIE);

        if (!gameResult?.value) {
            return NextResponse.redirect(new URL(AppLink.Home, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/result'],
};
