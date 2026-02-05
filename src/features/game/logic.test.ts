import { GameStatus } from '@/shared/types';
import {
    isAnswerCorrect,
    isLastQuestion,
    calculateReward,
    determineGameStatus,
    createGameResult,
    isValidQuestionIndex,
} from './logic';
import type { GameConfigQuestion } from './config/gameConfig.types';

describe('Game Logic', () => {
    describe('isAnswerCorrect', () => {
        it('should return true when answer is correct', () => {
            const result = isAnswerCorrect('answer1', ['answer1', 'answer2']);
            expect(result).toBe(true);
        });

        it('should return false when answer is incorrect', () => {
            const result = isAnswerCorrect('answer3', ['answer1', 'answer2']);
            expect(result).toBe(false);
        });

        it('should handle empty correct answers array', () => {
            const result = isAnswerCorrect('answer1', []);
            expect(result).toBe(false);
        });
    });

    describe('isLastQuestion', () => {
        it('should return true when on last question', () => {
            const result = isLastQuestion(9, 10);
            expect(result).toBe(true);
        });

        it('should return false when not on last question', () => {
            const result = isLastQuestion(5, 10);
            expect(result).toBe(false);
        });

        it('should return true for single question', () => {
            const result = isLastQuestion(0, 1);
            expect(result).toBe(true);
        });
    });

    describe('calculateReward', () => {
        it('should return current reward when answer is correct', () => {
            const result = calculateReward(true, 1000, 500);
            expect(result).toBe(1000);
        });

        it('should return previous earned when answer is incorrect', () => {
            const result = calculateReward(false, 1000, 500);
            expect(result).toBe(500);
        });

        it('should return 0 when incorrect on first question', () => {
            const result = calculateReward(false, 500, 0);
            expect(result).toBe(0);
        });
    });

    describe('determineGameStatus', () => {
        it('should return Won when correct and last question', () => {
            const result = determineGameStatus(true, true);
            expect(result).toBe(GameStatus.Won);
        });

        it('should return InProgress when correct but not last question', () => {
            const result = determineGameStatus(true, false);
            expect(result).toBe(GameStatus.InProgress);
        });

        it('should return Lost when incorrect', () => {
            const result = determineGameStatus(false, false);
            expect(result).toBe(GameStatus.Lost);
        });

        it('should return Lost when incorrect on last question', () => {
            const result = determineGameStatus(false, true);
            expect(result).toBe(GameStatus.Lost);
        });
    });

    describe('createGameResult', () => {
        it('should create Won result', () => {
            const result = createGameResult(1000000, GameStatus.Won);
            expect(result).toEqual({
                earned: 1000000,
                status: GameStatus.Won,
            });
        });

        it('should create Lost result', () => {
            const result = createGameResult(8000, GameStatus.Lost);
            expect(result).toEqual({
                earned: 8000,
                status: GameStatus.Lost,
            });
        });

        it('should create result with zero earned', () => {
            const result = createGameResult(0, GameStatus.Lost);
            expect(result).toEqual({
                earned: 0,
                status: GameStatus.Lost,
            });
        });
    });

    describe('isValidQuestionIndex', () => {
        const mockQuestions: GameConfigQuestion[] = [
            {
                id: 'q1',
                text: 'Question 1',
                answers: [
                    { id: 'a1', text: 'Answer 1' },
                    { id: 'a2', text: 'Answer 2' },
                ],
                correctAnswerIds: ['a1'],
                reward: 500,
            },
            {
                id: 'q2',
                text: 'Question 2',
                answers: [
                    { id: 'a3', text: 'Answer 3' },
                    { id: 'a4', text: 'Answer 4' },
                ],
                correctAnswerIds: ['a3'],
                reward: 1000,
            },
        ];

        it('should return true for valid index', () => {
            expect(isValidQuestionIndex(0, mockQuestions)).toBe(true);
            expect(isValidQuestionIndex(1, mockQuestions)).toBe(true);
        });

        it('should return false for negative index', () => {
            expect(isValidQuestionIndex(-1, mockQuestions)).toBe(false);
        });

        it('should return false for index >= length', () => {
            expect(isValidQuestionIndex(2, mockQuestions)).toBe(false);
            expect(isValidQuestionIndex(10, mockQuestions)).toBe(false);
        });

        it('should return false for empty questions array', () => {
            expect(isValidQuestionIndex(0, [])).toBe(false);
        });
    });
});
