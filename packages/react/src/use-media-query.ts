import matchMediaManager, {
    ChangeCallback,
    DefaultMediaQuery,
    safeAccess,
    SubscribeResult,
} from 'mq-core';
import { useLayoutEffect, useRef, useState } from 'react';

type Device = DefaultMediaQuery['device'];

type Options = Partial<Record<Device, any>>;

const initialModule = (options: Options) => {
    const device = matchMediaManager.matches();

    if (device === null) return undefined;

    return options[device];
};

function useMediaQuery<T extends Options>(
    options: T,
    defaultValue?: T[keyof T],
) {
    const handler = useRef(matchMediaManager.createHandler()).current;
    const subscribeResults = new Map<Device, SubscribeResult>();
    const [module, setModule] = useState(
        defaultValue ?? initialModule(options),
    );

    useLayoutEffect(() => {
        for (const [device, module] of Object.entries(options)) {
            const subscribeResult = handler.subscribe(device as Device, () => {
                setModule(module);
            });

            subscribeResults.set(device as Device, subscribeResult);
        }

        handler.run();

        return () => {
            handler.clear();
        };
    }, []);

    return {
        module: safeAccess(module) as T[keyof T],
        updateModule: (device: Device, callback: ChangeCallback) => {
            const subscribeResult = subscribeResults.get(device);

            if (subscribeResult) {
                subscribeResult.update(callback);
                subscribeResult.run();
            }
        },
    };
}

export default useMediaQuery;
