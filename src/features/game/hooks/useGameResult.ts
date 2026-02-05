'use client';

import { useCallback, useState, useEffect } from 'react';
import { GameStatus } from '@/shared/types';
import { GAME_RESULT_COOKIE } from '../constants';

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

interface UseGameResult {
    result: GameResult | null;
    isReady: boolean;
    saveResult: (result: GameResult) => void;
    clearResult: VoidFunction;
}

const useGameResult = (): UseGameResult => {
    const [state, setState] = useState<{
        result: GameResult | null;
        isReady: boolean;
    }>({ result: null, isReady: false });

    useEffect(() => {
        // Initialize from cookie on client mount - valid pattern for external data sources
        setState({ result: getCookie(), isReady: true }); // eslint-disable-line
    }, []);

    const saveResult = useCallback((data: GameResult) => {
        setCookie(data);
        setState((prev) => ({ ...prev, result: data }));
    }, []);

    const clearResult = useCallback(() => {
        clearCookie();
        setState((prev) => ({ ...prev, result: null }));
    }, []);

    return { ...state, saveResult, clearResult };
};

export default useGameResult;
