interface DiamondShapeProps {
    isActive?: boolean;
    className?: string;
    withLines?: boolean;
}

const DiamondShape = ({
    isActive = false,
    className,
    withLines = true,
}: DiamondShapeProps) => {
    const strokeColor = isActive ? '#FF8B37' : '#D0D0D8';

    if (withLines) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 376 40"
                fill="none"
                className={className}
                preserveAspectRatio="none"
            >
                <path d="M69 20H0" stroke={strokeColor} strokeWidth="1" />
                <path d="M376 20H307" stroke={strokeColor} strokeWidth="1" />
                <path
                    d="M90.2871 0.5H285.713C289.126 0.500018 292.363 2.0158 294.548 4.6377L307.349 20L294.548 35.3623C292.363 37.9842 289.126 39.5 285.713 39.5H90.2871C86.8742 39.5 83.6371 37.9842 81.4521 35.3623L68.6504 20L81.4521 4.6377C83.6371 2.0158 86.8742 0.500017 90.2871 0.5Z"
                    fill="white"
                    stroke={strokeColor}
                    strokeWidth="1"
                />
            </svg>
        );
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 240 40"
            fill="none"
            className={className}
            preserveAspectRatio="none"
        >
            <path
                d="M22.2871 0.5H217.713C221.126 0.500018 224.363 2.0158 226.548 4.6377L239.349 20L226.548 35.3623C224.363 37.9842 221.126 39.5 217.713 39.5H22.2871C18.8742 39.5 15.6371 37.9842 13.4521 35.3623L0.650391 20L13.4521 4.6377C15.6371 2.0158 18.8742 0.500017 22.2871 0.5Z"
                fill="white"
                stroke={strokeColor}
                strokeWidth="1"
            />
        </svg>
    );
};

export default DiamondShape;
