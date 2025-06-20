import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Global } from './common.styled.ts';
import { matchMediaManager } from 'react-mq-hook';

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
