import 'mq-react';

declare module 'mq-react' {
    export interface DefaultMediaQuery {
        device: 'mobile' | 'tablet' | 'desktop';
    }
}
