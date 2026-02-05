'use client';

import { useReducer, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { MoneyLevelStatus, AppLink, GameStatus } from '@/shared/types';
import type { GameConfigQuestion } from '../config/gameConfig.types';
import { useGameResult } from './useGameResult';

interface GameControllerState {
    currentQuestionIndex: number;
    earned: number;
}

type GameAction = { type: 'NEXT_QUESTION'; earned: number } | { type: 'RESET' };

const initialState: GameControllerState = {
    currentQuestionIndex: 0,
    earned: 0,
};

const gameReducer = (
    state: GameControllerState,
    action: GameAction
): GameControllerState => {
    switch (action.type) {
        case 'NEXT_QUESTION':
            return {
                currentQuestionIndex: state.currentQuestionIndex + 1,
                earned: action.earned,
            };

        case 'RESET':
            return initialState;

        default:
            return state;
    }
};

interface MoneyLevel {
    amount: number;
    status: MoneyLevelStatus;
}

export const useGameController = (questions: GameConfigQuestion[]) => {
    const router = useRouter();
    const [state, dispatch] = useReducer(gameReducer, initialState);
    const { save: saveResult } = useGameResult();

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

    const submitAnswer = useCallback(
        (answerId: string) => {
            if (!currentQuestion) return;

            const isCorrect =
                currentQuestion.correctAnswerIds.includes(answerId);

            if (isCorrect) {
                const newEarned = currentQuestion.reward;
                const isLastQuestion =
                    state.currentQuestionIndex === questions.length - 1;

                if (isLastQuestion) {
                    saveResult({ earned: newEarned, status: GameStatus.Won });
                    router.push(AppLink.Result);
                } else {
                    dispatch({ type: 'NEXT_QUESTION', earned: newEarned });
                }
            } else {
                saveResult({ earned: state.earned, status: GameStatus.Lost });
                router.push(AppLink.Result);
            }
        },
        [
            state.currentQuestionIndex,
            state.earned,
            currentQuestion,
            questions.length,
            router,
            saveResult,
        ]
    );

    return {
        currentQuestion,
        currentQuestionIndex: state.currentQuestionIndex,
        earned: state.earned,
        moneyLevels,
        submitAnswer,
    };
};
