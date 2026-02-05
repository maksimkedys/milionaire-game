'use client';

import { AnswerStatus } from '@/shared/types';
import styles from './AnswerOption.module.css';

interface AnswerOptionProps {
    letter: string;
    text: string;
    status?: AnswerStatus;
    onClick?: () => void;
    disabled?: boolean;
}

const AnswerOption = ({
    letter,
    text,
    status = AnswerStatus.Default,
    onClick,
    disabled = false,
}: AnswerOptionProps) => (
    <button
        type="button"
        className={`${styles.option} ${styles[status]}`}
        onClick={onClick}
        disabled={disabled}
    >
        <span className={styles.letter}>{letter}</span>
        <span className={styles.text}>{text}</span>
    </button>
);

export default AnswerOption;
