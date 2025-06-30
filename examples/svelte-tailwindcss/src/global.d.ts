import 'svelte-mq';

declare module 'svelte-mq' {
    export interface DefaultMediaQuery {
        device: 'mobile' | 'tablet' | 'desktop';
    }
}
