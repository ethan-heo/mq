import matchMediaManager, { type DefaultMediaQuery } from 'mq-core';
import { onDestroy, onMount } from 'svelte';
import { writable } from 'svelte/store'

type Device = DefaultMediaQuery['device'];

type Modules = Partial<Record<Device, any>>;

const initialModule = (modules: Modules) => {
    const device = matchMediaManager.matches();

    if (device === null) return undefined;

    return modules[device];
};


const mq = <M extends Modules>(modules: M, defaultModule?: M[keyof M]) => {
    const handler = matchMediaManager.createHandler();
    const module = writable(defaultModule ?? initialModule(modules))

    onMount(() => {
        for (const [device, newModule] of Object.entries(modules)) {
            handler.subscribe(device, () => {
                module.set(newModule)
            });
        }

        handler.run();
    })

    onDestroy(() => {
        handler.clear()
    })

    return module
};

export default mq;
