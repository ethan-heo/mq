import { MediaQuery } from './types';

export type ChangeCallback = (ev: MediaQueryListEvent) => void;

export type Unsubscribe = () => void;

class MatchMedia {
    #matchMedia: MediaQueryList;
    #callbacks: ChangeCallback[] = [];
    #listener: ChangeCallback;
    #pickedCallbacks: ChangeCallback[] | null = null;
    #skipMatches: boolean = false;

    constructor(mediaQuery: MediaQuery) {
        this.#listener = (ev) => {
            if (!this.#skipMatches && !ev.matches) return;

            if (Array.isArray(this.#pickedCallbacks)) {
                this.#callbacks.forEach(
                    (cb) => this.#pickedCallbacks?.includes(cb) && cb(ev),
                );
                this.#pickedCallbacks = null;
            } else {
                this.#callbacks.forEach((cb) => cb(ev));
            }
        };
        this.#matchMedia = window.matchMedia(mediaQuery);
        this.#matchMedia.addEventListener('change', this.#listener);
    }

    run(...callbacks: ChangeCallback[]) {
        this.#pickedCallbacks = callbacks.length === 0 ? null : callbacks;
        this.#matchMedia.dispatchEvent(new Event('change'));
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
}

export default MatchMedia;
