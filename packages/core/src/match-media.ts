import { MediaQuery } from './types';
import isBrowser from './utils/is-browser';

export type ChangeCallback = () => void;

export type Unsubscribe = () => void;

class MatchMedia {
    #matchMedia: MediaQueryList;
    #callbacks: ChangeCallback[] = [];
    #listener: (ev: MediaQueryListEvent) => void;
    #skipMatches: boolean = false;

    constructor(mediaQuery: MediaQuery) {
        this.#listener = (ev) => {
            if (!this.#skipMatches && !ev.matches) return;

            this.#callbacks.forEach((cb) => cb());
        };
        this.#matchMedia = this.getMatchMedia(mediaQuery);
        this.#matchMedia.addEventListener('change', this.#listener);
    }

    run(...callbacks: ChangeCallback[]) {
        if (!this.#skipMatches && !this.#matchMedia.matches) {
            return;
        }

        if (callbacks.length > 0) {
            this.#callbacks.forEach((cb) => callbacks.includes(cb) && cb());
        } else {
            this.#callbacks.forEach((cb) => cb());
        }
    }

    unsubscribe(callback: ChangeCallback) {
        this.#callbacks = this.#callbacks.filter((cb) => cb !== callback);
    }

    subscribe(callback: ChangeCallback): Unsubscribe {
        if (!this.#callbacks.includes(callback)) {
            this.#callbacks.push(callback);
        }

        return () => {
            this.unsubscribe(callback);
        };
    }

    matches() {
        return this.#matchMedia.matches;
    }

    clear() {
        this.#matchMedia.removeEventListener('change', this.#listener);
        this.#callbacks = [];
    }

    skipMatches() {
        this.#skipMatches = true;
    }

    private getMatchMedia(mediaQuery: MediaQuery) {
        if (isBrowser()) {
            return window.matchMedia(mediaQuery);
        } else {
            return {
                matches: true,
                addEventListener: (..._: any[]) => _,
                removeEventListener: (_: any) => _,
                dispatchEvent: (_: Event): any => _,
            } as unknown as MediaQueryList;
        }
    }
}

export default MatchMedia;
