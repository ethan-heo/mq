import MatchMedia, { ChangeCallback, Unsubscribe } from './match-media';
import { MediaQuery } from './types';

interface EmptyObject {
    [key: string]: any;
}

export interface SubscribeResult {
    unsubscribe: Unsubscribe;
    update(callback: ChangeCallback): SubscribeResult;
    run(): void;
}

export interface MatchMediaHandler<DefaultMediaQuery extends EmptyObject> {
    subscribe(
        device: DefaultMediaQuery['device'],
        callback: ChangeCallback,
    ): SubscribeResult;
    run(): void;
    clear(): void;
}

export interface MatchMediaManager<DefaultMediaQuery extends EmptyObject> {
    createMatchMedia(
        device: DefaultMediaQuery['device'],
        mediaQuery: MediaQuery,
        testMode?: boolean,
    ): void;
    createHandler(): MatchMediaHandler<DefaultMediaQuery>;
    has(device: DefaultMediaQuery['device']): boolean;
    clear(): void;
    matches(): DefaultMediaQuery['device'] | null;
}

const createMatchMediaManager = <
    T extends EmptyObject,
>(): MatchMediaManager<T> => {
    const matchMedias = new Map<string, MatchMedia>();
    const mediaQueries = new Map<T['device'], MediaQuery>();

    const createMatchMedia = (
        device: T['device'],
        mediaQuery: MediaQuery,
        testMode = false,
    ) => {
        const matchMedia = new MatchMedia(mediaQuery);

        if (testMode) {
            matchMedia.skipMatches();
        }

        matchMedias.set(device, matchMedia);
    };

    const createHandler = () => {
        const unsubscribes = new Set<Unsubscribe>();
        const callbacks = new Set<ChangeCallback>();

        const subscribe = (device: T['device'], callback: ChangeCallback) => {
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
    };

    const has = (device: T['device']) => {
        return matchMedias.has(device);
    };

    const clear = () => {
        for (const [, matchMedia] of matchMedias.entries()) {
            matchMedia.clear();
        }

        matchMedias.clear();
        mediaQueries.clear();
    };

    const matches = () => {
        let result: T['device'] | null = null;

        for (const [device, matchMedia] of matchMedias.entries()) {
            if (matchMedia.matches()) {
                result = device as T['device'];
            }
        }

        return result;
    };

    return {
        has,
        clear,
        matches,
        createMatchMedia,
        createHandler,
    };
};

export default createMatchMediaManager;
