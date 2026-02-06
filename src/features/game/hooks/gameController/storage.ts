import type { GameConfigQuestion } from '../../config/gameConfig.types';
import type { GameControllerState, SavedGameState } from './types';
import { STORAGE_KEY, STORAGE_ENCRYPTION_KEY } from '../../constants';

const encrypt = (data: string, key: string): string => {
    let result = '';
    for (let i = 0; i < data.length; i++) {
        const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        result += String.fromCharCode(charCode);
    }
    return btoa(result);
};

const decrypt = (encrypted: string, key: string): string => {
    try {
        const decoded = atob(encrypted);
        let result = '';
        for (let i = 0; i < decoded.length; i++) {
            const charCode =
                decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode);
        }
        return result;
    } catch {
        throw new Error('Failed to decrypt data');
    }
};

export const loadStateFromStorage = (
    questions: GameConfigQuestion[]
): GameControllerState | null => {
    if (typeof window === 'undefined') return null;

    try {
        const encrypted = localStorage.getItem(STORAGE_KEY);
        if (!encrypted) return null;

        const decrypted = decrypt(encrypted, STORAGE_ENCRYPTION_KEY);
        const saved: SavedGameState = JSON.parse(decrypted);
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

        const json = JSON.stringify(payload);
        const encrypted = encrypt(json, STORAGE_ENCRYPTION_KEY);
        localStorage.setItem(STORAGE_KEY, encrypted);
    } catch (error) {
        console.error('Failed to save game state to localStorage:', error);
    }
};

export const clearStateFromStorage = (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
};
