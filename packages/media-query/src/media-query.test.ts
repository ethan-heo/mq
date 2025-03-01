import { describe, expect, it, vi } from 'vitest';
import {
    getMatchMedia,
    createMatchMedia,
    removeMatchMedia,
} from './media-query';
import MatchMedia from './match-media';

describe(`media query`, () => {
    const obj = { callback: () => {} };
    const spy = vi.spyOn(obj, 'callback');

    it.concurrent(`1. create`, () => {
        createMatchMedia('mobile', '(max-width: 768px)');

        expect(getMatchMedia('mobile') instanceof MatchMedia).toBeTruthy();
    });

    it.concurrent(`2. subscribe`, () => {
        const matchMedia = getMatchMedia('mobile');

        matchMedia.subscribe(obj.callback);
        matchMedia.run();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it.concurrent(`3. remove`, () => {
        removeMatchMedia('mobile');

        expect(() => getMatchMedia('mobile')).toThrowError();
    });
});
