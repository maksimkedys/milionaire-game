import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { GAME_RESULT_COOKIE } from '@/features/game/constants';
import { AppLink, GameStatus } from '@/shared/types';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === AppLink.Result) {
        const gameResult = request.cookies.get(GAME_RESULT_COOKIE);

        if (!gameResult?.value) {
            return NextResponse.redirect(new URL(AppLink.Home, request.url));
        }

        try {
            const parsed = JSON.parse(decodeURIComponent(gameResult.value));

            if (
                typeof parsed !== 'object' ||
                typeof parsed.earned !== 'number' ||
                parsed.earned < 0 ||
                (parsed.status !== GameStatus.Won &&
                    parsed.status !== GameStatus.Lost)
            ) {
                const response = NextResponse.redirect(
                    new URL(AppLink.Home, request.url)
                );
                response.cookies.delete(GAME_RESULT_COOKIE);
                return response;
            }
        } catch {
            const response = NextResponse.redirect(
                new URL(AppLink.Home, request.url)
            );
            response.cookies.delete(GAME_RESULT_COOKIE);
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/result'],
};
