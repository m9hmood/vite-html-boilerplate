import fs from "fs"
import handlebars from 'vite-plugin-handlebars';
import removeConsole from 'vite-plugin-remove-console';
import {
    resolve
} from 'path';

export default {
    root: "./src",
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
        }),
        removeConsole(),
    ],
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: {
                ...fs.readdirSync("./src").filter(file => file.includes('.html')).reduce((ac, cv) => (ac[cv.split('.html')[0]] = resolve(__dirname, 'src/' + cv), ac), {}),
            }
        }
    },
    publicDir: '../public'
};