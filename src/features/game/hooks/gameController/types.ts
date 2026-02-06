export interface GameControllerState {
    currentQuestionIndex: number;
    earned: number;
    selectedAnswerId: string | null;
    isRevealed: boolean;
}

export interface SavedGameState {
    questionIds: string[];
    state: GameControllerState;
}

export type GameAction =
    | { type: 'SELECT_ANSWER'; answerId: string }
    | { type: 'REVEAL_ANSWER' }
    | { type: 'NEXT_QUESTION'; earned: number }
    | { type: 'RESET' }
    | { type: 'HYDRATE_FROM_STORAGE'; payload: GameControllerState }
    | { type: 'INIT_FIRST_QUESTION' };
