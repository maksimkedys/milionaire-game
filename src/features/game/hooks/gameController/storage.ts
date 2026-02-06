import type { GameConfigQuestion } from '../../config/gameConfig.types';
import type { GameControllerState, SavedGameState } from './types';
import { STORAGE_KEY } from '../../constants';

export const loadStateFromStorage = (
    questions: GameConfigQuestion[]
): GameControllerState | null => {
    if (typeof window === 'undefined') return null;

    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;

        const saved: SavedGameState = JSON.parse(raw);
        const currentQuestionIds = questions.map((q) => q.id);

        const isSameQuestions =
            saved.questionIds.length === currentQuestionIds.length &&
            saved.questionIds.every(
                (id, index) => id === currentQuestionIds[index]
            );

        if (!isSameQuestions) {
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }

        return saved.state;
    } catch (error) {
        console.error('Failed to load game state from localStorage:', error);
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
};

export const saveStateToStorage = (
    state: GameControllerState,
    questions: GameConfigQuestion[]
): void => {
    if (typeof window === 'undefined') return;

    try {
        const payload: SavedGameState = {
            questionIds: questions.map((q) => q.id),
            state,
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
        console.error('Failed to save game state to localStorage:', error);
    }
};

export const clearStateFromStorage = (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
};
