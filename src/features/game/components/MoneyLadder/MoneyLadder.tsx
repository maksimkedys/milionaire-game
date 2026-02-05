'use client';

import { useState } from 'react';
import cn from 'classnames';
import type { MoneyLevel } from '../../types';
import { formatMoney } from '@/shared/lib';
import { useMediaQuery } from '@/shared/hooks';
import { MenuIcon, CloseIcon, DiamondShape } from '@/shared/ui';
import styles from './MoneyLadder.module.css';

interface MoneyLadderProps {
    levels: MoneyLevel[];
}

const MoneyLadder = ({ levels }: MoneyLadderProps) => {
    const isTablet = useMediaQuery('(max-width: 768px)');
    const [showRewards, setShowRewards] = useState(false);

    const rewardsList = (
        <div className={styles.ladder}>
            <ul className={styles.list}>
                {levels.map((level) => (
                    <li
                        key={level.amount}
                        className={cn(styles.level, styles[level.status])}
                    >
                        <DiamondShape
                            isActive={level.status === 'current'}
                            className={styles.diamondShape}
                        />
                        <span className={styles.levelText}>
                            {formatMoney(level.amount)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );

    if (!isTablet) {
        return rewardsList;
    }

    return (
        <div className={styles.menuWrapper}>
            <div className={styles.menuTopWrapper}>
                <button
                    onClick={() => setShowRewards(!showRewards)}
                    className={styles.burgerButton}
                    aria-label={showRewards ? 'Close menu' : 'Open menu'}
                >
                    {showRewards ? (
                        <CloseIcon className={styles.icon} />
                    ) : (
                        <MenuIcon className={styles.icon} />
                    )}
                </button>
            </div>
            {showRewards && rewardsList}
        </div>
    );
};

export default MoneyLadder;
