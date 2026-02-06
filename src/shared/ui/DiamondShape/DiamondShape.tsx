import { DiamondShapeType } from '@/shared/types/enums';

interface DiamondShapeProps {
    isActive?: boolean;
    className?: string;
    type?: DiamondShapeType;
}

const DiamondShape = ({
    isActive = false,
    className,
    type = DiamondShapeType.Prize,
}: DiamondShapeProps) => {
    const strokeColor = isActive ? '#FF8B37' : '#D0D0D8';

    if (type === DiamondShapeType.Prize) {
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
            width="421"
            height="72"
            viewBox="0 0 421 72"
            fill="none"
            className={className}
            preserveAspectRatio="none"
        >
            <path d="M404 36L421 36" stroke={strokeColor} strokeWidth="1" />
            <path d="M0 36L17 36" stroke={strokeColor} strokeWidth="1" />
            <path
                d="M49.0117 0.5H371.988C375.607 0.500098 379.015 2.20331 381.187 5.09766L404.374 36L381.187 66.9023C379.015 69.7967 375.607 71.4999 371.988 71.5H49.0117C45.3931 71.4999 41.9854 69.7967 39.8135 66.9023L16.625 36L39.8135 5.09766C41.9854 2.20331 45.3931 0.5001 49.0117 0.5Z"
                fill="white"
                stroke={strokeColor}
                strokeWidth="1"
            />
        </svg>
    );
};

export default DiamondShape;
