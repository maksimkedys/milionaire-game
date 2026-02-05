'use client';

import { Heading } from '@/shared/ui';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
    question: string;
}

const QuestionCard = ({ question }: QuestionCardProps) => (
    <Heading level={2} className={styles.question}>
        {question}
    </Heading>
);

export default QuestionCard;
