'use client';

import { Button, Heading, Text, ThumbImage } from '@/shared/ui';
import { formatMoney } from '@/shared/lib';
import { ButtonVariant, AppLink, GameStatus } from '@/shared/types';
import { useGameResult } from '@/features/game/hooks';
import styles from './ResultSummary.module.css';

const ResultSummary = () => {
    const { result, isReady, clearResult } = useGameResult();

    if (!isReady || !result) {
        return null;
    }

    const isWon = result.status === GameStatus.Won;

    const handleTryAgain = () => {
        clearResult();
    };

    return (
        <main className={styles.main}>
            <ThumbImage className={styles.image} />

            <div className={styles.content}>
                <div className={styles.info}>
                    <Text className={styles.label}>
                        {isWon ? 'Congratulations!' : 'Total score:'}
                    </Text>
                    <Heading className={styles.title}>
                        {isWon
                            ? 'You are a millionaire!'
                            : `${formatMoney(result.earned)} earned`}
                    </Heading>
                </div>

                <Button
                    href={AppLink.Game}
                    variant={ButtonVariant.Primary}
                    onClick={handleTryAgain}
                >
                    Try again
                </Button>
            </div>
        </main>
    );
};

export default ResultSummary;
