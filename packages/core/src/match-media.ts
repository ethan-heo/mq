import { MediaQuery } from './types';

type ChangeCallback = (ev: MediaQueryListEvent) => void;

type Unsubscribe = () => void;

class MatchMedia {
    #matchMedia: MediaQueryList;
    #callbacks: ChangeCallback[] = [];
    #listener: ChangeCallback;

    constructor(mediaQuery: MediaQuery) {
        this.#listener = (ev) => this.#callbacks.forEach((cb) => cb(ev));
        this.#matchMedia = window.matchMedia(mediaQuery);
        this.#matchMedia.addEventListener('change', this.#listener);
    }

    run() {
        this.#matchMedia.dispatchEvent(new Event('change'));
    }

    subscribe(callback: ChangeCallback): Unsubscribe {
        this.#callbacks.push(callback);

        return () => {
            this.#callbacks = this.#callbacks.filter((cb) => cb !== callback);
        };
    }

    matches() {
        return this.#matchMedia.matches;
    }

    clear() {
        this.#matchMedia.removeEventListener('change', this.#listener);
        this.#callbacks = [];
    }
}

export default MatchMedia;
