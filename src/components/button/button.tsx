import React from 'react';
import style from './button.module.css';

type Props = {
    buttonType: 'primary' | 'secondary' | 'danger',
    children: React.ReactNode,
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

export function Button({buttonType, children, onClick}: Props) {
    return (<div className={style[buttonType] + ' ' + style.button} onClick={onClick}>
        {children}
    </div>)
}