import type { GameConfigQuestion } from './config/gameConfig.types';
import { GameStatus, MoneyLevelStatus } from '@/shared/types';

export type {
    GameConfig,
    GameConfigQuestion,
    GameConfigAnswerOption,
    AnswerId,
} from './config/gameConfig.types';

export interface GameState {
    status: GameStatus;
    currentQuestionIndex: number;
    questions: GameConfigQuestion[];
    earned: number;
}

export interface MoneyLevel {
    amount: number;
    status: MoneyLevelStatus;
}
