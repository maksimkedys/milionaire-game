'use client';

import { MoneyLevelStatus } from '@/shared/types';
import styles from './MoneyLadder.module.css';

interface MoneyLevel {
    amount: number;
    status: MoneyLevelStatus;
}

interface MoneyLadderProps {
    levels: MoneyLevel[];
}

const formatMoney = (amount: number): string =>
    `$${amount.toLocaleString('en-US')}`;

const MoneyLadder = ({ levels }: MoneyLadderProps) => (
    <aside className={styles.ladder}>
        <ul className={styles.list}>
            {levels.map((level) => (
                <li
                    key={level.amount}
                    className={`${styles.level} ${styles[level.status]}`}
                >
                    {formatMoney(level.amount)}
                </li>
            ))}
        </ul>
    </aside>
);

export default MoneyLadder;
