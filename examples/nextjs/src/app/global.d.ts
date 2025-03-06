import 'react-mq-hook';

declare module 'react-mq-hook' {
    export interface DefaultMediaQuery {
        device: 'mobile' | 'tablet' | 'desktop';
    }
}
