import { env } from "./src/env/server.mjs";

function defineNextConfig(config) {
  return config;
}

function customLoader({ src }) {
  return src;
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: customLoader,
  },
});
