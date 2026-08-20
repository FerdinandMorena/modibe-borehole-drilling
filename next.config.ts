import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root, otherwise Turbopack walks up and finds an
    // unrelated lockfile in the parent directory.
    root: path.resolve(__dirname),
  },
  images: {
    // AI-generated placeholder imagery is served straight off the Hugging Face
    // CDN rather than downloaded — the generated URLs cannot be fetched from a
    // sandboxed shell, so referencing them remotely is the working path.
    remotePatterns: [
      { protocol: "https", hostname: "cdn-uploads.huggingface.co" },
      { protocol: "https", hostname: "huggingface.co" },
      { protocol: "https", hostname: "*.hf.space" },
    ],
  },
};

export default nextConfig;
