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
