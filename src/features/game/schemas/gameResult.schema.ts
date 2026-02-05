import { z } from 'zod';
import { GameStatus } from '@/shared/types';

export const GameResultSchema = z.object({
    earned: z.number().nonnegative('Earned amount must be non-negative'),
    status: z.enum([GameStatus.Won, GameStatus.Lost]),
});

export type ValidatedGameResult = z.infer<typeof GameResultSchema>;
