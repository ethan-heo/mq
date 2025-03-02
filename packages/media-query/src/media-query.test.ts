import { describe, expect, it, vi } from 'vitest';
import { createMatchMedia, resistMediaQuery } from './media-query';
import MatchMedia from './match-media';

describe(`media query`, () => {
    const obj = { callback: () => {} };
    const spy = vi.spyOn(obj, 'callback');
    let matchMedia: MatchMedia;
    let unsubscribe = () => {};

    it.concurrent(`1. resist media query`, () => {
        resistMediaQuery('mobile', '(max-width: 768px)');
    });

    it.concurrent(`2. create match media`, () => {
        matchMedia = createMatchMedia('mobile');

        expect(matchMedia instanceof MatchMedia).toBeTruthy();
    });

    it.concurrent(`3. subscribe`, () => {
        unsubscribe = matchMedia.subscribe(obj.callback);
        matchMedia.run();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it.concurrent(`4. unsubscribe`, () => {
        unsubscribe();
        matchMedia.run();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it.concurrent(`5. clear match media`, () => {
        matchMedia.clear();

        expect(MatchMedia.ins.has(matchMedia)).toBeFalsy();
    });
});
