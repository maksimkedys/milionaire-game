import type { GameControllerState, GameAction } from './types';
import { initialState } from './constants';
import { clearStateFromStorage } from './storage';

export const gameReducer = (
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
            clearStateFromStorage();
            return initialState;

        case 'HYDRATE_FROM_STORAGE':
            return action.payload;

        case 'INIT_FIRST_QUESTION':
            return {
                ...initialState,
                currentQuestionIndex: 0,
            };

        default:
            return state;
    }
};
