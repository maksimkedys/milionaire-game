'use client';

import { useEffect, useCallback, useSyncExternalStore } from 'react';
import { GameStatus } from '@/shared/types';

export const GAME_RESULT_COOKIE = 'game_result';

export interface GameResult {
    earned: number;
    status: GameStatus.Won | GameStatus.Lost;
}

const getCookie = (): GameResult | null => {
    if (typeof document === 'undefined') return null;

    const match = document.cookie.match(
        new RegExp(`(?:^|; )${GAME_RESULT_COOKIE}=([^;]*)`)
    );
    if (!match) return null;

    try {
        return JSON.parse(decodeURIComponent(match[1])) as GameResult;
    } catch {
        return null;
    }
};

const setCookie = (result: GameResult): void => {
    document.cookie = `${GAME_RESULT_COOKIE}=${encodeURIComponent(
        JSON.stringify(result)
    )}; path=/; max-age=60`;
};

const clearCookie = (): void => {
    document.cookie = `${GAME_RESULT_COOKIE}=; path=/; max-age=0`;
};

const subscribe = (callback: () => void) => {
    window.addEventListener('storage', callback);
    return () => window.removeEventListener('storage', callback);
};

const getServerSnapshot = (): GameResult | null => null;

export const useGameResult = () => {
    const result = useSyncExternalStore(
        subscribe,
        getCookie,
        getServerSnapshot
    );

    const save = useCallback((data: GameResult) => {
        setCookie(data);
    }, []);

    const clear = useCallback(() => {
        clearCookie();
    }, []);

    return { result, save, clear };
};

export const useGameResultClear = () => {
    useEffect(() => {
        return () => {
            clearCookie();
        };
    }, []);
};
