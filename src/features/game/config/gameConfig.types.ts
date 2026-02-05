export type AnswerId = string;

export interface GameConfigAnswerOption {
    id: AnswerId;
    text: string;
}

export interface GameConfigQuestion {
    id: string;
    text: string;
    answers: GameConfigAnswerOption[];
    correctAnswerIds: AnswerId[];
    reward: number;
}

export interface GameConfig {
    levels: GameConfigQuestion[];
}
