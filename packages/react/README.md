## useMediaQuery

This library is a React hook that is useful for managing responsive styles in a modular way when using environments such as CSS-in-JS or CSS Modules.

### Installation

```bash
# npm
npm install react-mq-hook

# yarn
yarn add react-mq-hook

# pnpm
pnpm add react-mq-hook
```

### Usage

1. Create matchMedia instances for each platform.

    ```jsx
    import { createRoot } from 'react-dom/client';
    import { Global } from './common.styled.ts';
    import { matchMediaManager } from 'react-mq-hook';
    import App from './App.tsx';

    matchMediaManager.createMatchMedia('mobile', '(max-width: 768px)');
    matchMediaManager.createMatchMedia(
        'tablet',
        '(min-width: 769px) and (max-width: 1024px)',
    );
    matchMediaManager.createMatchMedia('desktop', '(min-width: 1025px)');

    createRoot(document.getElementById('root')!).render(
        <>
            <Global />
            <App />
        </>,
    );
    ```

2. Use `useMediaQuery` to assign platform-specific modules as arguments and apply styles using the returned module.

    ```jsx
    import useMediaQuery from 'react-mq-hook';
    import * as mobile from './mobile.styled';
    import * as tablet from './tablet.styled';
    import * as desktop from './desktop.styled';

    function App() {
        const Styled = useMediaQuery({
            mobile,
            tablet,
            desktop,
        });

        return (
            <Styled.Container>
                <Styled.RedItem />
                <Styled.GreenItem />
                <Styled.BlueItem />
            </Styled.Container>
        );
    }

    export default App;
    ```

### TypeScript Support

- You can define platforms using a declaration file.

    ```tsx
    import 'react-mq-hook';

    declare module 'react-mq-hook' {
        export interface DefaultMediaQuery {
            device: 'mobile' | 'tablet' | 'desktop';
        }
    }
    ```
