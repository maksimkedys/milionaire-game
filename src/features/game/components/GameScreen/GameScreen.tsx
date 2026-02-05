'use client';

import { useGameController } from '../../hooks';
import type { GameConfigQuestion } from '../../config/gameConfig.types';
import GameLayout from '../GameLayout';
import QuestionCard from '../QuestionCard';
import AnswerList from '../AnswerList';
import MoneyLadder from '../MoneyLadder';
import { LoadingSpinner, ErrorMessage } from '@/shared/ui';
import styles from './GameScreen.module.css';

interface GameScreenProps {
    questions: GameConfigQuestion[];
}

const GameScreen = ({ questions }: GameScreenProps) => {
    const {
        currentQuestion,
        moneyLevels,
        selectedAnswerId,
        isRevealed,
        selectAnswer,
    } = useGameController(questions);

    if (!questions || questions.length === 0) {
        return (
            <GameLayout sidebar={<MoneyLadder levels={[]} />}>
                <ErrorMessage
                    title="No questions available"
                    message="Please check the game configuration"
                />
            </GameLayout>
        );
    }

    if (!currentQuestion) {
        return (
            <GameLayout sidebar={<MoneyLadder levels={moneyLevels} />}>
                <LoadingSpinner message="Loading question..." />
            </GameLayout>
        );
    }

    return (
        <GameLayout sidebar={<MoneyLadder levels={moneyLevels} />}>
            <div className={styles.content}>
                <QuestionCard question={currentQuestion.text} />

                <AnswerList
                    answers={currentQuestion.answers}
                    selectedId={selectedAnswerId}
                    correctIds={currentQuestion.correctAnswerIds}
                    revealed={isRevealed}
                    onSelect={selectAnswer}
                    disabled={!!selectedAnswerId}
                />
            </div>
        </GameLayout>
    );
};

export default GameScreen;
