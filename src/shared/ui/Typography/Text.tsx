'use client';

import type { ReactNode } from 'react';

interface TextProps {
    children: ReactNode;
}

const Text = ({ children }: TextProps) => <p>{children}</p>;

export default Text;
