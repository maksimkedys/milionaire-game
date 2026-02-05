'use client';

import { useGameController } from '../../hooks/useGameController';
import type { GameConfigQuestion } from '../../config/gameConfig.types';
import GameLayout from '../GameLayout';
import QuestionCard from '../QuestionCard';
import AnswerList from '../AnswerList';
import MoneyLadder from '../MoneyLadder';
import styles from './GameScreen.module.css';

interface GameScreenProps {
    questions: GameConfigQuestion[];
}

const GameScreen = ({ questions }: GameScreenProps) => {
    const { currentQuestion, moneyLevels, submitAnswer } =
        useGameController(questions);

    if (!currentQuestion) {
        return <div>Loading...</div>;
    }

    return (
        <GameLayout sidebar={<MoneyLadder levels={moneyLevels} />}>
            <div className={styles.content}>
                <QuestionCard question={currentQuestion.text} />
                <AnswerList
                    answers={currentQuestion.answers}
                    onSelect={submitAnswer}
                />
            </div>
        </GameLayout>
    );
};

export default GameScreen;
