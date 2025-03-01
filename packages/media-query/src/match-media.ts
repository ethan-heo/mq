import { MediaQuery } from './types';

type MatchMediaCallback = (ev: MediaQueryListEvent) => void;

class MatchMedia {
    #matchMedia: MediaQueryList;
    #callbacks: MatchMediaCallback[] = [];
    #callback: MatchMediaCallback;

    constructor(mediaQuery: MediaQuery) {
        this.#callback = (ev) => this.#callbacks.forEach((cb) => cb(ev));
        this.#matchMedia = window.matchMedia(mediaQuery);
        this.#matchMedia.addEventListener('change', this.#callback);
    }

    run() {
        this.#matchMedia.dispatchEvent(new Event('change'));
    }

    subscribe(callback: MatchMediaCallback) {
        this.#callbacks.push(callback);

        return () => {
            this.#callbacks = this.#callbacks.filter((cb) => cb !== callback);
        };
    }

    clear() {
        this.#matchMedia.removeEventListener('change', this.#callback);
        this.#callbacks = [];
    }
}

export default MatchMedia;
