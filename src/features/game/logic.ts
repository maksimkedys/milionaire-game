import type { GameConfigQuestion } from './config/gameConfig.types';
import type { GameState } from './types';
import { GameStatus } from '@/shared/types';

export const createInitialGameState = (
    questions: GameConfigQuestion[]
): GameState => ({
    status: GameStatus.Idle,
    currentQuestionIndex: 0,
    questions,
    earned: 0,
});

/**
 * Checks if the answer is correct
 */
export const isAnswerCorrect = (
    answerId: string,
    correctAnswerIds: string[]
): boolean => {
    return correctAnswerIds.includes(answerId);
};

/**
 * Checks if the question is the last one
 */
export const isLastQuestion = (
    currentIndex: number,
    totalQuestions: number
): boolean => {
    return currentIndex === totalQuestions - 1;
};

/**
 * Calculates the reward
 */
export const calculateReward = (
    isCorrect: boolean,
    currentReward: number,
    previousEarned: number
): number => {
    if (!isCorrect) {
        return previousEarned;
    }
    return currentReward;
};

/**
 * Determines the game status after the answer
 */
export const determineGameStatus = (
    isCorrect: boolean,
    isLastQ: boolean
): GameStatus => {
    if (!isCorrect) {
        return GameStatus.Lost;
    }
    return isLastQ ? GameStatus.Won : GameStatus.InProgress;
};

/**
 * Creates the game result
 */
export const createGameResult = (
    earned: number,
    status: GameStatus.Won | GameStatus.Lost
) => ({
    earned,
    status,
});

/**
 * Validates the question index
 */
export const isValidQuestionIndex = (
    index: number,
    questions: GameConfigQuestion[]
): boolean => {
    return index >= 0 && index < questions.length;
};
