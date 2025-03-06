import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { resistMediaQuery } from 'react-mq-hook';
import './common.css';

resistMediaQuery('mobile', '(max-width: 768px)');
resistMediaQuery('tablet', '(min-width: 769px) and (max-width: 1024px)');
resistMediaQuery('desktop', '(min-width: 1025px)');

createRoot(document.getElementById('root')!).render(<App />);
