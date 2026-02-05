'use client';

import Image from 'next/image';

interface ThumbImageProps {
    className?: string;
}

const ThumbImage = ({ className }: ThumbImageProps) => (
    <Image
        src="/webp/thumb.webp"
        alt="Millionaire game illustration"
        width={624}
        height={368}
        className={className}
        priority
    />
);

export default ThumbImage;
