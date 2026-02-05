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
