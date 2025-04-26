import path from 'path';
import { fileURLToPath } from 'url';
import svgr from '@svgr/webpack';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.watchOptions = {
        poll: 5000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**", "**/.git/**", "**/.next/**"],
      };
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Wasmモジュールの設定
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    // // Wasmファイルのローダー設定
    // config.module.rules.push({
    //   test: /\.wasm$/,
    //   type: 'webassembly/async',
    // });

    // // 非同期モジュールの設定
    // if (!isServer) {
    //   config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';
    // }

    // // パス解決の設定
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   '@wasm': path.join(__dirname, 'public/wasm'),
    // };

        // 非サーバーサイドでのWasmファイルの出力設定
        if (!isServer) {
          config.output = {
            ...config.output,
            webassemblyModuleFilename: 'static/wasm/[modulehash].wasm',
          };
        }
    
        // Wasmモジュールのエイリアス設定
        config.resolve.alias = {
          ...config.resolve.alias,
          'wasm': path.join(process.cwd(), 'public/wasm'),
        };

    return config;
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pagead2.googlesyndication.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
};

export default nextConfig;
