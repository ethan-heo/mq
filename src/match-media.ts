import { MediaQuery } from './types';
import isUndefined from './utils/is-undefined';

type Instance = InstanceType<typeof MatchMedia>;
type MatchMediaCallback = (ev: MediaQueryListEvent) => void;

const isInitialized = (ins: any): ins is Required<Instance> => {
    if (!(ins instanceof MatchMedia)) {
        return false;
    }

    return !isUndefined(ins.matchMedia) && !isUndefined(ins.callback);
};

interface MatchMediaOptions {
    changeCallback: MatchMediaCallback;
}

class MatchMedia {
    mediaQuery: MediaQuery;
    matchMedia?: MediaQueryList;
    callback?: MatchMediaCallback;
    changeCallback?: MatchMediaCallback;

    constructor(mediaQuery: MediaQuery) {
        this.mediaQuery = mediaQuery;
    }

    init(options: MatchMediaOptions) {
        this.callback = options.changeCallback;
        this.matchMedia = window.matchMedia(this.mediaQuery);
        this.matchMedia.addEventListener('change', this.callback);
    }

    run() {
        if (!isInitialized(this)) {
            return;
        }

        this.matchMedia.dispatchEvent(new Event('change'));
    }

    clear() {
        if (!isInitialized(this)) {
            return;
        }

        this.matchMedia.removeEventListener('change', this.callback);
    }
}

export default MatchMedia;
