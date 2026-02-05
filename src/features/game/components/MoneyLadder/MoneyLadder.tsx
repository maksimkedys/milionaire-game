'use client';

import cn from 'classnames';
import type { MoneyLevel } from '../../types';
import { formatMoney } from '@/shared/lib';
import styles from './MoneyLadder.module.css';

interface MoneyLadderProps {
    levels: MoneyLevel[];
}

const MoneyLadder = ({ levels }: MoneyLadderProps) => (
    <aside className={styles.ladder}>
        <ul className={styles.list}>
            {levels.map((level) => (
                <li
                    key={level.amount}
                    className={cn(styles.level, styles[level.status])}
                >
                    {formatMoney(level.amount)}
                </li>
            ))}
        </ul>
    </aside>
);

export default MoneyLadder;
