import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { loadFontsFromTailwindSource } from "./plugins/loadFontsFromTailwindSource";

const hmrHost = process.env.VITE_HMR_HOST;
const hmrProtocol = process.env.VITE_HMR_PROTOCOL ?? "wss";
const hmrClientPort = Number(process.env.VITE_HMR_CLIENT_PORT ?? 443);
const hmrPath = process.env.VITE_HMR_PATH ?? "/hmr";

export default defineConfig({
  plugins: [loadFontsFromTailwindSource(), reactRouter(), tsconfigPaths()],
  server: {
    host: "0.0.0.0",
    port: 9931,
    allowedHosts: ["connect.sohub.com.bd", "connect-client.sohub.com.bd"],
    hmr: hmrHost
      ? {
          protocol: hmrProtocol,
          host: hmrHost,
          clientPort: hmrClientPort,
          path: hmrPath,
        }
      : undefined,
  },
  build: {
    target: 'es2022'
  }
});
