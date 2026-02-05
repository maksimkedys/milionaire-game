import { AnswerStatus } from '@/shared/types';

export const getAnswerStatus = (
    answerId: string,
    selectedId: string | null | undefined,
    correctIds: string[] | undefined,
    revealed: boolean
): AnswerStatus => {
    if (!revealed) {
        return answerId === selectedId
            ? AnswerStatus.Selected
            : AnswerStatus.Default;
    }

    if (correctIds?.includes(answerId)) {
        return AnswerStatus.Correct;
    }

    if (answerId === selectedId) {
        return AnswerStatus.Wrong;
    }

    return AnswerStatus.Default;
};
