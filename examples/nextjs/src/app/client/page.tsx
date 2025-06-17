'use client';

import useMediaQuery, { matchMediaManager } from 'react-mq-hook';
import mobile from '../mobile.module.css';
import tablet from '../tablet.module.css';
import desktop from '../desktop.module.css';

matchMediaManager.createMatchMedia(
    'tablet',
    '(min-width: 769px) and (max-width: 1024px)',
);
matchMediaManager.createMatchMedia('desktop', '(min-width: 1025px)');
matchMediaManager.createMatchMedia('mobile', '(max-width: 768px)');

export default function Client() {
    const { module: css } = useMediaQuery({
        mobile,
        tablet,
        desktop,
    });

    return (
        <div suppressHydrationWarning className={css.container}>
            <div className={`${css.item} ${css.red}`}></div>
            <div className={`${css.item} ${css.green}`}></div>
            <div className={`${css.item} ${css.blue}`}></div>
        </div>
    );
}
