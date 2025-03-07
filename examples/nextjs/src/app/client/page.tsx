'use client';

import useMediaQuery, { addMediaQuery } from 'react-mq-hook';
import mobile from '../mobile.module.css';
import tablet from '../tablet.module.css';
import desktop from '../desktop.module.css';

addMediaQuery('mobile', '(max-width: 768px)');
addMediaQuery('tablet', '(min-width: 769px) and (max-width: 1024px)');
addMediaQuery('desktop', '(min-width: 1025px)');

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
