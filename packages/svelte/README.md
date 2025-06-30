## svelte-mq

This library helps manage responsive styles efficiently when using a modular styling approach in a Svelte environment.

### Installation

```bash
# npm
npm install svelte-mq

# yarn
yarn add svelte-mq

# pnpm
pnpm add svelte-mq
```

### Usage

1.  Create matchMedia instances for each platform.

    ```ts
    import { mount } from 'svelte';
    import './app.css';
    import App from './App.svelte';
    import { matchMediaManager } from 'svelte-mq';

    matchMediaManager.createMatchMedia('mobile', '(max-width: 768px)');
    matchMediaManager.createMatchMedia(
        'tablet',
        '(min-width: 769px) and (max-width: 1024px)',
    );
    matchMediaManager.createMatchMedia('desktop', '(min-width: 1025px)');

    const app = mount(App, {
        target: document.getElementById('app')!,
    });

    export default app;
    ```

2.  Use `mq` to assign platform-specific modules as arguments and apply styles using the returned module.

    > When using a returned store value in JSX, you need to prefix it with a $.

    ```svelte
    <script lang="ts">
        import Mobile from './Mobile.svelte';
        import Tablet from './Tablet.svelte';
        import Desktop from './Desktop.svelte';
        import mq from 'svelte-mq';

        const Style = mq({
            mobile: Mobile,
            tablet: Tablet,
            desktop: Desktop,
        });
    </script>

    <svelte:component this={$Style}>
        <div class={`item red`}></div>
        <div class={`item green`}></div>
        <div class={`item blue`}></div>
    </svelte:component>
    ```

You can find more examples in the [examples/](../../examples/) directory.

### TypeScript Support

- You can define platforms using a declaration file.

    ```tsx
    import 'svelte-mq';

    declare module 'svelte-mq' {
        export interface DefaultMediaQuery {
            device: 'mobile' | 'tablet' | 'desktop';
        }
    }
    ```
