import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        rollupOptions: {
            external: ['react'],
        },
        lib: {
            entry: 'src/index.ts',
            name: 'use-media-query',
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
