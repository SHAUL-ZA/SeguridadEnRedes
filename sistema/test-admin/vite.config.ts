import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// const options = {
//     key: fs.readFileSync('./frontend.key'),
//     cert: fs.readFileSync('./frontend.cer'),
// }

// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react()],
//     define: {
//         'process.env': process.env,
//     },
//     server: {
//         https: options,
//     },
//     base: './',
// });

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
    server: {
        host: true,
    },
    base: './',
});
