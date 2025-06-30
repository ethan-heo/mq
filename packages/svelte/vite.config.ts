import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        rollupOptions: {
            external: ['svelte'],
        },
        lib: {
            entry: 'src/index.ts',
            name: 'mq',
            fileName: 'index',
            formats: ['es'],
        },
    },
    plugins: [
        dts({
            rollupTypes: true,
        }),
    ],
});
