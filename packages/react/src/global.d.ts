import 'mq-core';

declare module 'mq-core' {
    export interface DefaultMediaQuery {
        device: 'mobile' | 'tablet' | 'desktop';
        module: string;
    }
}
