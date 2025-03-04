## @mq/react

Provides hooks to use MQ in your React environment.

### Installation

```bash
# npm
npm install @mq/react

# yarn
yarn add @mq/react

# pnpm
pnpm add @mq/react
```

### Usage

#### Option. Generate d.ts

Helps you infer the viewport device information used in your project.

```typescript
import '@mq/react';

declare module '@mq/react' {
    export interface DefaultMediaQuery {
        device: 'mobile' | 'tablet' | 'desktop';
    }
}
```

#### 1. resistMediaQuery

Register the viewport information to use in your project.

For example:

```typescript
import { createRoot } from 'react-dom/client';
import { resistMediaQuery } from '@mq/react';
import App from './App.tsx';
import './common.css';

resistMediaQuery('mobile', '(max-width: 768px)');
resistMediaQuery('tablet', '(min-width: 769px) and (max-width: 1024px)');
resistMediaQuery('desktop', '(min-width: 1025px)');

createRoot(document.getElementById('root')!).render(<App />);
```

#### 2. useMediaQuery

Use the device-specific styles you registered using the useMediaQuery hook.

```typescript
import useMediaQuery from '@mq/react';
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
