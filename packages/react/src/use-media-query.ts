import MatchMedia, { createMatchMedia, DefaultMediaQuery } from 'mq-core';
import { useEffect, useState, useMemo } from 'react';

type Device = DefaultMediaQuery['device'];

type Options = Partial<Record<Device, any>>;

type MatchMediaMap = Map<Device, MatchMedia>;

const initialState = <T extends Options>({
    options,
    matchMediaMap,
    defaultValue,
}: {
    defaultValue?: T[keyof T];
    options: T;
    matchMediaMap: MatchMediaMap;
}) => {
    if (defaultValue) {
        return defaultValue;
    }

    for (const [device, module] of Object.entries(options)) {
        const matchMedia = matchMediaMap.get(device as Device);

        if (!matchMedia) {
            continue;
        }

        if (matchMedia.matches()) {
            return module;
        }
    }
};

const createMatchMediaMap = (options: Options) => {
    const matchMediaMap = new Map<Device, MatchMedia>();

    if (typeof window === 'undefined') {
        return matchMediaMap;
    }

    Object.keys(options).forEach((device) => {
        matchMediaMap.set(device as Device, createMatchMedia(device as Device));
    });

    return matchMediaMap;
};

function useMediaQuery<T extends Options>(
    options: T,
    defaultValue?: T[keyof T],
) {
    const matchMediaMap = useMemo(() => createMatchMediaMap(options), []);
    const [module, setModule] = useState<T[Device]>(
        initialState({ options, matchMediaMap, defaultValue }),
    );

    useEffect(() => {
        Object.entries(options).forEach(([device, module]) => {
            const matchMedia = matchMediaMap.get(device as Device);

            if (!matchMedia) {
                return;
            }

            matchMedia.subscribe((ev) => {
                const matches = (ev.currentTarget as MediaQueryList)!.matches;

                if (matches) {
                    setModule(module);
                }
            });

            matchMedia.run();
        });

        return () => {
            matchMediaMap.forEach((matchMedia) => {
                matchMedia.clear();
            });
        };
    }, []);

    return module as T[keyof T];
}

export default useMediaQuery;
