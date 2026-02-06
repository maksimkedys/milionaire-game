'use client';

import { useReducer, useCallback, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MoneyLevelStatus, AppLink, GameStatus } from '@/shared/types';
import type { MoneyLevel } from '../types';
import type { GameConfigQuestion } from '../config/gameConfig.types';
import { DELAY_BEFORE_REVEAL, DELAY_BEFORE_NEXT } from '../constants';
import {
    calculateReward,
    determineGameStatus,
    isLastQuestion,
    createGameResult,
} from '../logic';
import useGameResult from './useGameResult';
import {
    loadStateFromStorage,
    saveStateToStorage,
    gameReducer,
    initialState,
} from './gameController';

export const useGameController = (questions: GameConfigQuestion[]) => {
    const router = useRouter();
    const [state, dispatch] = useReducer(gameReducer, initialState);
    const { saveResult } = useGameResult();
    const pendingResultRef = useRef<{
        earned: number;
        status: GameStatus.Won | GameStatus.Lost;
    } | null>(null);
    const currentQuestion =
        state.currentQuestionIndex >= 0
            ? questions[state.currentQuestionIndex]
            : undefined;

    const moneyLevels: MoneyLevel[] = useMemo(() => {
        const getStatus = (index: number): MoneyLevelStatus => {
            const { currentQuestionIndex } = state;

            if (currentQuestionIndex < 0) {
                return MoneyLevelStatus.Default;
            }

            if (index < currentQuestionIndex) return MoneyLevelStatus.Passed;
            if (index === currentQuestionIndex) return MoneyLevelStatus.Current;

            return MoneyLevelStatus.Default;
        };

        return questions.map((q, index) => ({
            amount: q.reward,
            status: getStatus(index),
        }));
    }, [questions, state]);

    const handleAnswerResult = useCallback(() => {
        if (!currentQuestion || !state.selectedAnswerId) return;

        const isCorrect = currentQuestion.correctAnswerIds.includes(
            state.selectedAnswerId
        );
        const newEarned = calculateReward(
            isCorrect,
            currentQuestion.reward,
            state.earned
        );
        const isLast = isLastQuestion(
            state.currentQuestionIndex,
            questions.length
        );
        const gameStatus = determineGameStatus(isCorrect, isLast);

        if (gameStatus === GameStatus.Won || gameStatus === GameStatus.Lost) {
            const result = createGameResult(
                newEarned,
                gameStatus as GameStatus.Won | GameStatus.Lost
            );
            pendingResultRef.current = result;
            saveResult(result);
            router.push(AppLink.Result);
        } else {
            dispatch({ type: 'NEXT_QUESTION', earned: newEarned });
        }
    }, [
        currentQuestion,
        state.selectedAnswerId,
        state.earned,
        state.currentQuestionIndex,
        questions.length,
        saveResult,
        router,
    ]);

    const selectAnswer = useCallback(
        (answerId: string) => {
            if (state.selectedAnswerId || !currentQuestion) return;
            dispatch({ type: 'SELECT_ANSWER', answerId });
        },
        [state.selectedAnswerId, currentQuestion]
    );

    useEffect(() => {
        const savedState = loadStateFromStorage(questions);

        if (savedState) {
            dispatch({ type: 'HYDRATE_FROM_STORAGE', payload: savedState });
        } else {
            dispatch({ type: 'INIT_FIRST_QUESTION' });
        }
    }, [questions]);

    useEffect(() => {
        if (state.currentQuestionIndex < 0) return;
        saveStateToStorage(state, questions);
    }, [state, questions]);

    useEffect(() => {
        if (state.selectedAnswerId && !state.isRevealed) {
            const timer = setTimeout(() => {
                dispatch({ type: 'REVEAL_ANSWER' });
            }, DELAY_BEFORE_REVEAL);

            return () => clearTimeout(timer);
        }
    }, [state.selectedAnswerId, state.isRevealed]);

    useEffect(() => {
        if (!state.isRevealed || !currentQuestion || !state.selectedAnswerId) {
            return;
        }

        const timer = setTimeout(() => {
            handleAnswerResult();
        }, DELAY_BEFORE_NEXT);

        return () => clearTimeout(timer);
    }, [
        currentQuestion,
        handleAnswerResult,
        state.isRevealed,
        state.selectedAnswerId,
    ]);

    return {
        currentQuestion,
        currentQuestionIndex: state.currentQuestionIndex,
        earned: state.earned,
        moneyLevels,
        selectedAnswerId: state.selectedAnswerId,
        isRevealed: state.isRevealed,
        selectAnswer,
    };
};
