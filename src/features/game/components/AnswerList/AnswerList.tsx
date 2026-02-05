'use client';

import { AnswerStatus } from '@/shared/types';
import AnswerOption from '../AnswerOption';
import styles from './AnswerList.module.css';

const LETTERS = ['A', 'B', 'C', 'D'];

interface Answer {
    id: string;
    text: string;
}

interface AnswerListProps {
    answers: Answer[];
    selectedId?: string | null;
    correctIds?: string[];
    revealed?: boolean;
    onSelect: (id: string) => void;
    disabled?: boolean;
}

const getAnswerStatus = (
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

const AnswerList = ({
    answers,
    selectedId,
    correctIds,
    revealed = false,
    onSelect,
    disabled = false,
}: AnswerListProps) => (
    <div className={styles.grid}>
        {answers.map((answer, index) => (
            <AnswerOption
                key={answer.id}
                letter={LETTERS[index]}
                text={answer.text}
                status={getAnswerStatus(
                    answer.id,
                    selectedId,
                    correctIds,
                    revealed
                )}
                onClick={() => onSelect(answer.id)}
                disabled={disabled || revealed}
            />
        ))}
    </div>
);

export default AnswerList;
