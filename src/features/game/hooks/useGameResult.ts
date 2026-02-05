'use client';

import { useCallback, useState } from 'react';
import { GameStatus } from '@/shared/types';
import { GAME_RESULT_COOKIE } from '../constants';
import { GameResultSchema } from '../schemas/gameResult.schema';
import { ZodError } from 'zod';

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
        const parsed = JSON.parse(decodeURIComponent(match[1]));
        const validated = GameResultSchema.parse(parsed);
        return validated;
    } catch (error) {
        if (error instanceof ZodError) {
            console.warn('Invalid game result cookie (validation error):', {
                issues: error.issues,
                data: match[1],
            });
        } else {
            console.warn('Invalid game result cookie (parse error):', error);
        }
        clearCookie();
        return null;
    }
};

const clearCookie = (): void => {
    if (typeof document === 'undefined') return;
    document.cookie = `${GAME_RESULT_COOKIE}=; path=/; max-age=0`;
};

const setCookie = (result: GameResult): void => {
    if (typeof document === 'undefined') return;

    try {
        const validated = GameResultSchema.parse(result);

        document.cookie = `${GAME_RESULT_COOKIE}=${encodeURIComponent(
            JSON.stringify(validated)
        )}; path=/; max-age=60; SameSite=Strict`;
    } catch (error) {
        if (error instanceof ZodError) {
            console.error('Failed to save game result (validation error):', {
                issues: error.issues,
                data: result,
            });
        } else {
            console.error('Failed to save game result:', error);
        }
        throw new Error('Invalid game result data');
    }
};

interface UseGameResult {
    result: GameResult | null;
    saveResult: (result: GameResult) => void;
    clearResult: VoidFunction;
}

const useGameResult = (): UseGameResult => {
    const [state, setState] = useState<GameResult | null>(getCookie() || null);

    const saveResult = useCallback((data: GameResult) => {
        setCookie(data);
        setState(data);
    }, []);

    const clearResult = useCallback(() => {
        clearCookie();
        setState(null);
    }, []);

    return { result: state, saveResult, clearResult };
};

export default useGameResult;
