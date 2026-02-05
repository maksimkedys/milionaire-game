'use client';

import type { ReactNode } from 'react';

interface TextProps {
    children: ReactNode;
    className?: string;
}

const Text = ({ children, className }: TextProps) => (
    <p className={className}>{children}</p>
);

export default Text;
