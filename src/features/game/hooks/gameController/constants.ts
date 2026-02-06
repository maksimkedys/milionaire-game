import type { GameControllerState } from './types';

export const initialState: GameControllerState = {
    currentQuestionIndex: -1,
    earned: 0,
    selectedAnswerId: null,
    isRevealed: false,
};
