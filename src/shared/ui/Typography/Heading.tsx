'use client';

import type { ReactNode } from 'react';

interface HeadingProps {
    children: ReactNode;
}

const Heading = ({ children }: HeadingProps) => <h1>{children}</h1>;

export default Heading;
