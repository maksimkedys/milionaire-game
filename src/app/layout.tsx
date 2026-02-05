import type { Metadata } from 'next';
import { fonts } from '@/fonts';
import { ErrorBoundary } from '@/shared/ui';
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
            <body className={fonts.inter}>
                <ErrorBoundary>{children}</ErrorBoundary>
            </body>
        </html>
    );
};

export default RootLayout;
