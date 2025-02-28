import MatchMedia from './match-media';
import { DefaultMediaQuery, MediaQuery } from './types';

export const MMMap = new Map<DefaultMediaQuery['device'], MatchMedia>();

/**
 *
 * @param device
 * @param mediaQuery
 *
 * @example
 * resist('mobile', '(max-width: 768px)');
 * resist('desktop', 'screen and (min-width: 1024px)');
 */
export const resistMediaQuery = (
    device: DefaultMediaQuery['device'],
    mediaQuery: MediaQuery,
) => {
    MMMap.set(device, new MatchMedia(mediaQuery));
};

/**
 *
 * @param device
 * @returns
 */
export const getMatchMedia = (device: DefaultMediaQuery['device']) => {
    const mm = MMMap.get(device);

    if (!mm) {
        throw new Error(`MatchMedia for ${device} is not found`);
    }

    return mm;
};
