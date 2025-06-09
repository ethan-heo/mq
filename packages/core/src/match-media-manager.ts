import MatchMedia, { ChangeCallback, Unsubscribe } from './match-media';
import { DefaultMediaQuery, MediaQuery } from './types';

export interface SubscribeResult {
    unsubscribe: Unsubscribe;
    update(callback: ChangeCallback): SubscribeResult;
    run(): void;
}

export interface MatchMediaHandler {
    subscribe(
        device: DefaultMediaQuery['device'],
        callback: ChangeCallback,
    ): SubscribeResult;
    run(): void;
    clear(): void;
}

export interface MatchMediaManager {
    createMatchMedia(
        device: DefaultMediaQuery['device'],
        mediaQuery: MediaQuery,
    ): void;
    createMatchMediaHandler(): MatchMediaHandler;
    has(device: DefaultMediaQuery['device']): boolean;
    clear(): void;
}

const createMatchMediaManager = (): MatchMediaManager => {
    const matchMedias = new Map<string, MatchMedia>();

    return {
        createMatchMedia: (
            device: DefaultMediaQuery['device'],
            mediaQuery: MediaQuery,
        ) => {
            if (Array.from(matchMedias.keys()).includes(device)) {
                throw new Error(`Already created device: ${device}`);
            }

            matchMedias.set(device, new MatchMedia(mediaQuery));
        },
        createMatchMediaHandler: () => {
            const unsubscribes = new Set<Unsubscribe>();
            const callbacks = new Set<ChangeCallback>();

            const subscribe = (
                device: DefaultMediaQuery['device'],
                callback: ChangeCallback,
            ) => {
                const matchMedia = matchMedias.get(device);

                if (!matchMedia) {
                    throw new Error(
                        `Not created MatchMedia: ${device}. You can first create MatchMedia instance using createMatchMedia`,
                    );
                }

                const unsubscribe = matchMedia.subscribe(callback);

                unsubscribes.add(unsubscribe);
                callbacks.add(callback);

                return {
                    unsubscribe,
                    update: (updateCallback: ChangeCallback) => {
                        unsubscribes.delete(unsubscribe);
                        callbacks.delete(callback);
                        unsubscribe();

                        return subscribe(device, updateCallback);
                    },
                    run: () => {
                        matchMedia.run(callback);
                    },
                };
            };

            const run = () => {
                for (const [, matchMedia] of matchMedias.entries()) {
                    matchMedia.run(...callbacks);
                }
            };

            const clear = () => {
                unsubscribes.forEach((unsubscribe) => unsubscribe());
                unsubscribes.clear();
                callbacks.clear();
            };

            return {
                subscribe,
                run,
                clear,
            };
        },
        has: (device: DefaultMediaQuery['device']) => {
            return matchMedias.has(device);
        },
        clear: () => {
            for (const [, matchMedia] of matchMedias.entries()) {
                matchMedia.clear();
            }

            matchMedias.clear();
        },
    };
};

export default createMatchMediaManager();
