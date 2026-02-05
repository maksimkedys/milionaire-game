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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.isRevealed, state.selectedAnswerId]);

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
