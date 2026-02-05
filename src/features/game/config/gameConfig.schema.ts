import { z } from 'zod';

export const GameConfigAnswerOptionSchema = z.object({
    id: z.string().min(1, 'Answer ID is required'),
    text: z.string().min(1, 'Answer text is required'),
});

export const GameConfigQuestionSchema = z.object({
    id: z.string().min(1, 'Question ID is required'),
    text: z.string().min(1, 'Question text is required'),
    answers: z
        .array(GameConfigAnswerOptionSchema)
        .min(2, 'At least 2 answers are required')
        .max(10, 'Maximum 10 answers allowed'),
    correctAnswerIds: z
        .array(z.string())
        .min(1, 'At least one correct answer is required'),
    reward: z.number().positive('Reward must be a positive number'),
});

export const GameConfigSchema = z.object({
    levels: z
        .array(GameConfigQuestionSchema)
        .min(1, 'At least one question is required'),
});

export const validateGameConfig = (data: unknown) => {
    const parsed = GameConfigSchema.parse(data);

    parsed.levels.forEach((question, index) => {
        const answerIds = new Set(question.answers.map((a) => a.id));

        question.correctAnswerIds.forEach((correctId) => {
            if (!answerIds.has(correctId)) {
                throw new Error(
                    `Question ${index + 1} (${
                        question.id
                    }): Correct answer ID "${correctId}" not found in answers`
                );
            }
        });

        if (answerIds.size !== question.answers.length) {
            throw new Error(
                `Question ${index + 1} (${
                    question.id
                }): Duplicate answer IDs found`
            );
        }
    });

    const questionIds = new Set<string>();
    parsed.levels.forEach((question) => {
        if (questionIds.has(question.id)) {
            throw new Error(`Duplicate question ID: ${question.id}`);
        }
        questionIds.add(question.id);
    });

    return parsed;
};

export type ValidatedGameConfig = z.infer<typeof GameConfigSchema>;
