import matchMediaManager, {
    ChangeCallback,
    DefaultMediaQuery,
    MatchMediaHandler,
    SubscribeResult,
} from 'mq-core';
import { useEffect, useState } from 'react';

type Device = DefaultMediaQuery['device'];

type Options = Partial<Record<Device, any>>;

const initialModule = (options: Options, handler: MatchMediaHandler) => {
    return options[handler.matches()!];
};

function useMediaQuery<T extends Options>(
    options: T,
    defaultValue?: T[keyof T],
) {
    const subscribeResults = new Map<Device, SubscribeResult>();
    const matchMediaHandler = matchMediaManager.createMatchMediaHandler();
    const [module, setModule] = useState(
        defaultValue ?? initialModule(options, matchMediaHandler),
    );

    useEffect(() => {
        for (const [device, module] of Object.entries(options)) {
            const subscribeResult = matchMediaHandler.subscribe(
                device as Device,
                () => {
                    setModule(module);
                },
            );

            subscribeResults.set(device as Device, subscribeResult);
        }

        return () => {
            matchMediaHandler.clear();
        };
    }, []);

    return {
        module: module as T[keyof T],
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
