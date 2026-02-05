'use client';

import Image from 'next/image';
import { Button } from '@/shared/ui';
import { ButtonVariant, AppLink, GameStatus } from '@/shared/types';
import {
    useGameResult,
    useGameResultClear,
} from '@/features/game/hooks/useGameResult';
import styles from './ResultSummary.module.css';

const formatMoney = (amount: number): string =>
    `$${amount.toLocaleString('en-US')}`;

const ResultSummary = () => {
    const { result } = useGameResult();
    useGameResultClear();

    if (!result) {
        return null;
    }

    const isWon = result.status === GameStatus.Won;

    return (
        <main className={styles.main}>
            <Image
                src="/webp/thumb.webp"
                alt="Result"
                width={624}
                height={368}
                className={styles.image}
            />

            <div className={styles.content}>
                <div className={styles.info}>
                    <p className={styles.label}>
                        {isWon ? 'Congratulations!' : 'Total score:'}
                    </p>
                    <h1 className={styles.title}>
                        {isWon
                            ? 'You are a millionaire!'
                            : `${formatMoney(result.earned)} earned`}
                    </h1>
                </div>

                <Button href={AppLink.Game} variant={ButtonVariant.Primary}>
                    Try again
                </Button>
            </div>
        </main>
    );
};

export default ResultSummary;
