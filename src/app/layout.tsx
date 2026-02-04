import type { Metadata } from 'next';
import { fonts } from '@/fonts';
import '@/styles/globals.css';

interface Input {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Millionaire game',
    description: 'Who wants to be a millionaire?',
};

const RootLayout = ({ children }: Input) => {
    return (
        <html lang="en">
            <body className={fonts.inter}>{children}</body>
        </html>
    );
};

export default RootLayout;
