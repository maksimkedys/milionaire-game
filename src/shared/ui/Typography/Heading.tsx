'use client';

import type { ReactNode } from 'react';

interface HeadingProps {
    children: ReactNode;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
}

const Heading = ({ children, level = 1, className }: HeadingProps) => {
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    return <Tag className={className}>{children}</Tag>;
};

export default Heading;
