import MatchMedia, { createMatchMedia, DefaultMediaQuery } from '@mq/core';
import { useEffect, useState } from 'react';

type Device = DefaultMediaQuery['device'];

type Options = Record<Device, any>;

type MatchMediaMap = Map<Device, MatchMedia>;

const initialState = ({
    options,
    matchMediaMap,
}: {
    options: Options;
    matchMediaMap: MatchMediaMap;
}) => {
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

    Object.keys(options).forEach((device) => {
        matchMediaMap.set(device as Device, createMatchMedia(device as Device));
    });

    return matchMediaMap;
};

function useMediaQuery<T extends Record<Device, any>>(options: T) {
    const matchMediaMap = createMatchMediaMap(options);
    const [module, setModule] = useState<T[Device]>(
        initialState({ options, matchMediaMap }),
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
        });

        return () => {
            matchMediaMap.forEach((matchMedia) => {
                matchMedia.clear();
            });
        };
    }, [options]);

    return module as T[Device];
}

export default useMediaQuery;
