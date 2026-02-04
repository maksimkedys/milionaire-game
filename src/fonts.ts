import { Inter } from 'next/font/google';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

export const fonts = {
    inter: inter.style.fontFamily,
};
