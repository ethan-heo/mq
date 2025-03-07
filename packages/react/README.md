## react-mq-hook

Provides hooks to use MQ in your React environment.

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

#### Option. Generate d.ts

Helps you infer the viewport device information used in your project.

```typescript
import 'react-mq-hook';

declare module 'react-mq-hook' {
    export interface DefaultMediaQuery {
        device: 'mobile' | 'tablet' | 'desktop';
    }
}
```

#### 1. addMediaQuery

Register the viewport information to use in your project.

For example:

```typescript
import { createRoot } from 'react-dom/client';
import { addMediaQuery } from 'react-mq-hook';
import App from './App.tsx';
import './common.css';

addMediaQuery('mobile', '(max-width: 768px)');
addMediaQuery('tablet', '(min-width: 769px) and (max-width: 1024px)');
addMediaQuery('desktop', '(min-width: 1025px)');

createRoot(document.getElementById('root')!).render(<App />);
```

#### 2. useMediaQuery

Use the device-specific styles you registered using the useMediaQuery hook.

```typescript
import useMediaQuery from 'react-mq-hook';
import mobile from './mobile.module.css';
import tablet from './tablet.module.css';
import desktop from './desktop.module.css';

function App() {
    const module = useMediaQuery({
        mobile,
        tablet,
        desktop,
    });

    return (
        <div className={module.container}>
            <div className={`${module.item} ${module.red}`}></div>
            <div className={`${module.item} ${module.green}`}></div>
            <div className={`${module.item} ${module.blue}`}></div>
        </div>
    );
}

export default App;
```

#### 3. Set a default value

By default, the return value is set to return a value where matchMedia's matches is true, but you can make it return the default value by setting the default value for the second argument.

```typescript
import useMediaQuery from 'react-mq-hook';
import mobile from './mobile.module.css';
import tablet from './tablet.module.css';
import desktop from './desktop.module.css';

function App() {
    const module = useMediaQuery({
        mobile,
        tablet,
        desktop,
    }, mobile); // modules === mobile

    return (
        <div className={module.container}>
            <div className={`${module.item} ${module.red}`}></div>
            <div className={`${module.item} ${module.green}`}></div>
            <div className={`${module.item} ${module.blue}`}></div>
        </div>
    );
}

export default App;
```
