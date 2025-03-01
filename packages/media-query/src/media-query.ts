import MatchMedia from './match-media';
import { DefaultMediaQuery, MediaQuery } from './types';

const matchMediaMap = new Map<DefaultMediaQuery['device'], MatchMedia>();

/**
 *
 * @param device DefaultMediaQuery['device']
 * @param mediaQuery
 *
 * @example
 * createMatchMedia('mobile', '(max-width: 768px)');
 * createMatchMedia('desktop', 'screen and (min-width: 1024px)');
 */
export const createMatchMedia = (
    device: DefaultMediaQuery['device'],
    mediaQuery: MediaQuery,
) => {
    matchMediaMap.set(device, new MatchMedia(mediaQuery));
};

/**
 *
 * @param device DefaultMediaQuery['device']
 */
export const removeMatchMedia = (device: DefaultMediaQuery['device']) => {
    const matchMedia = matchMediaMap.get(device);

    if (!matchMedia) {
        throw new Error(`MatchMedia for ${device} is not found`);
    }

    matchMedia.clear();
    matchMediaMap.delete(device);
};

/**
 *
 * @param device DefaultMediaQuery['device']
 * @returns
 */
export const getMatchMedia = (device: DefaultMediaQuery['device']) => {
    const matchMedia = matchMediaMap.get(device);

    if (!matchMedia) {
        throw new Error(`MatchMedia for ${device} is not found`);
    }

    return matchMedia;
};
