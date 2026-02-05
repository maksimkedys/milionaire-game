import type { GameConfig } from './gameConfig.types';
import { validateGameConfig } from './gameConfig.schema';
import { ZodError } from 'zod';

const formatZodError = (error: ZodError): string => {
    const errors = error.issues.map((issue) => {
        const path = issue.path.join(' → ');
        return `• ${path}: ${issue.message}`;
    });

    return `Game configuration validation failed:\n\n${errors.join('\n')}`;
};

export const loadGameConfig = async (): Promise<GameConfig> => {
    try {
        const data = await import('./game.config.json');
        const rawConfig = 'default' in data ? data.default : data;
        const validatedConfig = validateGameConfig(rawConfig);

        return validatedConfig;
    } catch (error) {
        console.error('Failed to load or validate game config:', error);

        if (error instanceof ZodError) {
            throw new Error(formatZodError(error));
        }

        if (error instanceof Error) {
            throw new Error(
                `Game configuration error: ${error.message}\n\nPlease check game.config.json`
            );
        }

        throw new Error(
            'Failed to load game configuration. Please check game.config.json'
        );
    }
};
