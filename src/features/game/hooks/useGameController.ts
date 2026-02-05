'use client';

import { useReducer, useCallback, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MoneyLevelStatus, AppLink, GameStatus } from '@/shared/types';
import type { MoneyLevel } from '../types';
import type { GameConfigQuestion } from '../config/gameConfig.types';
import { DELAY_BEFORE_REVEAL, DELAY_BEFORE_NEXT } from '../constants';
import useGameResult from './useGameResult';

interface GameControllerState {
    currentQuestionIndex: number;
    earned: number;
    selectedAnswerId: string | null;
    isRevealed: boolean;
}

type GameAction =
    | { type: 'SELECT_ANSWER'; answerId: string }
    | { type: 'REVEAL_ANSWER' }
    | { type: 'NEXT_QUESTION'; earned: number }
    | { type: 'RESET' };

const initialState: GameControllerState = {
    currentQuestionIndex: 0,
    earned: 0,
    selectedAnswerId: null,
    isRevealed: false,
};

const gameReducer = (
    state: GameControllerState,
    action: GameAction
): GameControllerState => {
    switch (action.type) {
        case 'SELECT_ANSWER':
            return {
                ...state,
                selectedAnswerId: action.answerId,
            };

        case 'REVEAL_ANSWER':
            return {
                ...state,
                isRevealed: true,
            };

        case 'NEXT_QUESTION':
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex + 1,
                earned: action.earned,
                selectedAnswerId: null,
                isRevealed: false,
            };

        case 'RESET':
            return initialState;

        default:
            return state;
    }
};

export const useGameController = (questions: GameConfigQuestion[]) => {
    const router = useRouter();
    const [state, dispatch] = useReducer(gameReducer, initialState);
    const { saveResult } = useGameResult();
    const pendingResultRef = useRef<{
        earned: number;
        status: GameStatus.Won | GameStatus.Lost;
    } | null>(null);

    const currentQuestion = questions[state.currentQuestionIndex];

    const moneyLevels: MoneyLevel[] = useMemo(
        () =>
            questions.map((q, index) => ({
                amount: q.reward,
                status:
                    index < state.currentQuestionIndex
                        ? MoneyLevelStatus.Passed
                        : index === state.currentQuestionIndex
                        ? MoneyLevelStatus.Current
                        : MoneyLevelStatus.Default,
            })),
        [questions, state.currentQuestionIndex]
    );

    // Handle reveal after selection
    useEffect(() => {
        if (state.selectedAnswerId && !state.isRevealed) {
            const timer = setTimeout(() => {
                dispatch({ type: 'REVEAL_ANSWER' });
            }, DELAY_BEFORE_REVEAL);

            return () => clearTimeout(timer);
        }
    }, [state.selectedAnswerId, state.isRevealed]);

    // Handle next question or navigation after reveal
    useEffect(() => {
        if (!state.isRevealed || !currentQuestion || !state.selectedAnswerId) {
            return;
        }

        const isCorrect = currentQuestion.correctAnswerIds.includes(
            state.selectedAnswerId
        );

        const timer = setTimeout(() => {
            if (isCorrect) {
                const newEarned = currentQuestion.reward;
                const isLastQuestion =
                    state.currentQuestionIndex === questions.length - 1;

                if (isLastQuestion) {
                    pendingResultRef.current = {
                        earned: newEarned,
                        status: GameStatus.Won,
                    };
                    saveResult({ earned: newEarned, status: GameStatus.Won });
                    router.push(AppLink.Result);
                } else {
                    dispatch({ type: 'NEXT_QUESTION', earned: newEarned });
                }
            } else {
                pendingResultRef.current = {
                    earned: state.earned,
                    status: GameStatus.Lost,
                };
                saveResult({ earned: state.earned, status: GameStatus.Lost });
                router.push(AppLink.Result);
            }
        }, DELAY_BEFORE_NEXT);

        return () => clearTimeout(timer);
    }, [
        state.isRevealed,
        state.selectedAnswerId,
        state.currentQuestionIndex,
        state.earned,
        currentQuestion,
        questions.length,
        router,
        saveResult,
    ]);

    const selectAnswer = useCallback(
        (answerId: string) => {
            if (state.selectedAnswerId || !currentQuestion) return;
            dispatch({ type: 'SELECT_ANSWER', answerId });
        },
        [state.selectedAnswerId, currentQuestion]
    );

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
