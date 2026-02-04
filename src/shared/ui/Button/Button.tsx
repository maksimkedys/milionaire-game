'use client';

import type {
    ButtonHTMLAttributes,
    AnchorHTMLAttributes,
    ReactNode,
} from 'react';
import Link from 'next/link';
import { ButtonVariant } from '@/shared/types';
import styles from './Button.module.css';

type ButtonBaseProps = {
    children: ReactNode;
    variant?: ButtonVariant;
    className?: string;
};

type ButtonAsButton = ButtonBaseProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
        href?: never;
    };

type ButtonAsLink = ButtonBaseProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
        href: string;
    };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = (props: ButtonProps) => {
    const {
        children,
        variant = ButtonVariant.Primary,
        className,
        ...rest
    } = props;

    const classes = `${styles.button} ${styles[variant]} ${className ?? ''}`;

    if ('href' in props && props.href) {
        const { href, ...linkProps } = rest as Omit<
            ButtonAsLink,
            keyof ButtonBaseProps
        >;
        return (
            <Link href={href} className={classes} {...linkProps}>
                {children}
            </Link>
        );
    }

    const buttonProps = rest as Omit<ButtonAsButton, keyof ButtonBaseProps>;
    return (
        <button type="button" className={classes} {...buttonProps}>
            {children}
        </button>
    );
};
