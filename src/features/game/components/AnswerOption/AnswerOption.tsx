'use client';

import cn from 'classnames';
import { AnswerStatus } from '@/shared/types';
import { DiamondShape } from '@/shared/ui';
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
        className={cn(styles.option, styles[status])}
        onClick={onClick}
        disabled={disabled}
    >
        <DiamondShape
            isActive={status === AnswerStatus.Selected}
            className={styles.diamondShape}
        />
        <span className={styles.content}>
            <span className={styles.letter}>{letter}</span>
            <span className={styles.text}>{text}</span>
        </span>
    </button>
);

export default AnswerOption;
