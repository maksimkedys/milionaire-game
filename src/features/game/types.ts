import type { GameConfigQuestion } from './config/gameConfig.types';
import { GameStatus } from '@/shared/types';

export interface GameState {
    status: GameStatus;
    currentQuestionIndex: number;
    questions: GameConfigQuestion[];
    earned: number;
}
