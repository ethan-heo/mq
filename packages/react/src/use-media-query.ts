import MatchMedia, { createMatchMedia, DefaultMediaQuery } from '@mq/core';
import { useEffect, useRef, useState } from 'react';

type Device = DefaultMediaQuery['device'];

function useMediaQuery<T extends Record<Device, any>>(options: T) {
    const [module, setModule] = useState<T[Device]>();
    const mmMap = useRef<Map<Device, MatchMedia>>(new Map()).current;

    useEffect(() => {
        const mediaQueries = Object.entries(options);

        if (mediaQueries.length === 0) {
            return;
        }

        mediaQueries.forEach(([device, module]) => {
            const matchMedia = createMatchMedia(device as Device);

            matchMedia.subscribe((ev) => {
                console.log(device, ev.matches);
                if (ev.matches) {
                    setModule(module);
                }
            });
            matchMedia.run();

            mmMap.set(device as Device, matchMedia);
        });

        return () => {
            mmMap.forEach((matchMedia) => {
                matchMedia.clear();
            });
        };
    }, [options]);

    return module as T[Device];
}

export default useMediaQuery;
