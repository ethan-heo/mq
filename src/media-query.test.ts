import { describe, expect, it, vi } from 'vitest';
import { getMatchMedia, resistMediaQuery } from './media-query';
import MatchMedia from './match-media';

describe(`media query`, () => {
    const obj = { callback: () => {} };
    const spy = vi.spyOn(obj, 'callback');

    it.concurrent(`1. resist media query`, () => {
        resistMediaQuery('mobile', '(max-width: 768px)');

        expect(getMatchMedia('mobile') instanceof MatchMedia).toBeTruthy();
    });

    it.concurrent(`2. MatchMedia init`, () => {
        const mobile = getMatchMedia('mobile');
        const spy = vi.spyOn(mobile, 'init');

        mobile.init({
            changeCallback: obj.callback,
        });

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it.concurrent(`3. MatchMedia run`, () => {
        const mobile = getMatchMedia('mobile');

        mobile.run();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it.concurrent(`4. MatchMedia clear`, () => {
        const mobile = getMatchMedia('mobile');

        mobile.clear();
        mobile.run();

        expect(spy).not.toHaveBeenCalledTimes(2);
    });
});
