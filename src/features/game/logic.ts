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
 * Перевіряє чи відповідь правильна
 */
export const isAnswerCorrect = (
    answerId: string,
    correctAnswerIds: string[]
): boolean => {
    return correctAnswerIds.includes(answerId);
};

/**
 * Визначає чи це останнє питання
 */
export const isLastQuestion = (
    currentIndex: number,
    totalQuestions: number
): boolean => {
    return currentIndex === totalQuestions - 1;
};

/**
 * Обчислює винагороду
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
 * Визначає статус гри після відповіді
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
 * Створює результат гри
 */
export const createGameResult = (
    earned: number,
    status: GameStatus.Won | GameStatus.Lost
) => ({
    earned,
    status,
});

/**
 * Валідує індекс питання
 */
export const isValidQuestionIndex = (
    index: number,
    questions: GameConfigQuestion[]
): boolean => {
    return index >= 0 && index < questions.length;
};
