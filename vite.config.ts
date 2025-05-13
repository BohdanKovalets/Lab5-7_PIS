import { defineConfig } from "vite";
import pugPlugin from "vite-plugin-pug";

const options = { pretty: true };
const locals = { name: "'Work For All" };

export default defineConfig({
  plugins: [pugPlugin(undefined, { pagesUrl: "./pages" })],
});
