'use client';

import type { ReactNode } from 'react';
import styles from './GameLayout.module.css';

interface GameLayoutProps {
    children: ReactNode;
    sidebar?: ReactNode;
}

const GameLayout = ({ children, sidebar }: GameLayoutProps) => (
    <div className={styles.layout}>
        <main className={styles.main}>{children}</main>
        {sidebar && <aside className={styles.sidebar}>{sidebar}</aside>}
    </div>
);

export default GameLayout;
