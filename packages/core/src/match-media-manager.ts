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
    matches(): DefaultMediaQuery['device'] | null;
}

export interface MatchMediaManager {
    setMediaQuery(
        device: DefaultMediaQuery['device'],
        mediaQuery: MediaQuery,
    ): void;
    init(testMode?: boolean): void;
    createHandler(): MatchMediaHandler;
    has(device: DefaultMediaQuery['device']): boolean;
    clear(): void;
}

const createMatchMediaManager = (): MatchMediaManager => {
    const matchMedias = new Map<string, MatchMedia>();
    const mediaQueries = new Map<DefaultMediaQuery['device'], MediaQuery>();

    const setMediaQuery = (
        device: DefaultMediaQuery['device'],
        mediaQuery: MediaQuery,
    ) => {
        mediaQueries.set(device, mediaQuery);
    };

    const init = (testMode = false) => {
        for (const [device, mediaQuery] of mediaQueries.entries()) {
            const matchMedia = new MatchMedia(mediaQuery);

            if (testMode) {
                matchMedia.skipMatches();
            }

            matchMedias.set(device, matchMedia);
        }
    };

    const createHandler = () => {
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

        const matches = () => {
            let result = null;

            for (const [device, matchMedia] of matchMedias.entries()) {
                if (matchMedia.matches()) {
                    result = device;
                }
            }

            return result;
        };

        return {
            subscribe,
            run,
            clear,
            matches,
        };
    };

    const has = (device: DefaultMediaQuery['device']) => {
        return matchMedias.has(device);
    };

    const clear = () => {
        for (const [, matchMedia] of matchMedias.entries()) {
            matchMedia.clear();
        }

        matchMedias.clear();
        mediaQueries.clear();
    };

    return {
        init,
        has,
        clear,
        setMediaQuery,
        createHandler,
    };
};

export default createMatchMediaManager();
