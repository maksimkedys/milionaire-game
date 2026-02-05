import type { GameConfig } from './gameConfig.types';

export const loadGameConfig = async (): Promise<GameConfig> => {
    const data = await import('./game.config.json');
    return data;
};
