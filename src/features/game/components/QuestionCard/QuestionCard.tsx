'use client';

import styles from './QuestionCard.module.css';

interface QuestionCardProps {
    question: string;
}

const QuestionCard = ({ question }: QuestionCardProps) => (
    <h2 className={styles.question}>{question}</h2>
);

export default QuestionCard;
