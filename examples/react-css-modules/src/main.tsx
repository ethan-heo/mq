import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { matchMediaManager } from 'react-mq-hook';
import './common.css';

matchMediaManager.createMatchMedia('mobile', '(max-width: 768px)');
matchMediaManager.createMatchMedia(
    'tablet',
    '(min-width: 769px) and (max-width: 1024px)',
);
matchMediaManager.createMatchMedia('desktop', '(min-width: 1025px)');

createRoot(document.getElementById('root')!).render(<App />);
