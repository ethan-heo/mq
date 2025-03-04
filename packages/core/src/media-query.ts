import MatchMedia from './match-media';
import { DefaultMediaQuery, MediaQuery } from './types';

const mediaQueryMap = new Map<DefaultMediaQuery['device'], MediaQuery>();

/**
 *
 * @param device DefaultMediaQuery['device']
 * @param mediaQuery
 * @example
 * resistMediaQuery('mobile', '(max-width: 768px)');
 * resistMediaQuery('desktop', 'screen and (min-width: 1024px)');
 */
export const resistMediaQuery = (
    device: DefaultMediaQuery['device'],
    mediaQuery: MediaQuery,
) => {
    mediaQueryMap.set(device, mediaQuery);
};

/**
 *
 * @param device DefaultMediaQuery['device']
 * @param mediaQuery
 *
 * @example
 * createMatchMedia('mobile');
 * createMatchMedia('desktop');
 */
export const createMatchMedia = (device: DefaultMediaQuery['device']) => {
    const mediaQuery = mediaQueryMap.get(device);

    if (!mediaQuery) {
        throw new Error(`MediaQuery for ${device} is not found`);
    }

    return new MatchMedia(mediaQuery);
};
