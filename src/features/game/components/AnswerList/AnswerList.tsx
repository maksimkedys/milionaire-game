'use client';

import type { GameConfigAnswerOption } from '../../types';
import { getAnswerStatus, getAnswerLetter } from '../../lib';
import AnswerOption from '../AnswerOption';
import styles from './AnswerList.module.css';

interface AnswerListProps {
    answers: GameConfigAnswerOption[];
    selectedId?: string | null;
    correctIds?: string[];
    revealed?: boolean;
    onSelect: (id: string) => void;
    disabled?: boolean;
}

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
                letter={getAnswerLetter(index)}
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
