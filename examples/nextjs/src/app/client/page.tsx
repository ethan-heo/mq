'use client';

import useMediaQuery, { resistMediaQuery } from 'mq-react';
import mobile from '../mobile.module.css';
import tablet from '../tablet.module.css';
import desktop from '../desktop.module.css';

resistMediaQuery('mobile', '(max-width: 768px)');
resistMediaQuery('tablet', '(min-width: 769px) and (max-width: 1024px)');
resistMediaQuery('desktop', '(min-width: 1025px)');

export default function Client() {
    const css = useMediaQuery(
        {
            mobile,
            tablet,
            desktop,
        },
        desktop,
    );

    return (
        <div suppressHydrationWarning className={css.container}>
            <div className={`${css.item} ${css.red}`}></div>
            <div className={`${css.item} ${css.green}`}></div>
            <div className={`${css.item} ${css.blue}`}></div>
        </div>
    );
}
