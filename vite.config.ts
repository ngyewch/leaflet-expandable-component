import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        minify: true,
        sourcemap: true,
        lib: {
            entry: './src/index.ts',
            name: 'leaflet-expandable-control',
            formats: ['es', 'umd'],
        },
    },
    plugins: [
        dts({
            rollupTypes: true,
        }),
    ],
});
