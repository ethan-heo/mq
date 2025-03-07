import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { addMediaQuery } from 'react-mq-hook';
import './global.css';

addMediaQuery('mobile', '(max-width: 768px)');
addMediaQuery('tablet', '(min-width: 769px) and (max-width: 1024px)');
addMediaQuery('desktop', '(min-width: 1025px)');

createRoot(document.getElementById('root')!).render(<App />);
