// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 

const isDev = process.env.NODE_ENV == "development";

const stylesHandler = MiniCssExtractPlugin.loader;

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: {
      auto: true,
      localIdentName: '[path][local]_[hash:base64:8]'
    }
  }
}

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const config = {
  mode: process.env.NODE_ENV,
  entry: ['react-hot-loader/patch', resolve("./src/index.tsx")],
  target: ['web', 'es5'],
  output: {
    path: resolve("./dist"),
    publicPath: '/',
    filename: 'index.js',
  },
  devServer: {
    static: resolve('./dist'), 
    hot: true,
    open: true,
    host: "localhost",
    historyApiFallback: true,
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),

    new MiniCssExtractPlugin(),

    new NodePolyfillPlugin(),

    // 开启 BundleAnalyzerPlugin 
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ["@babel/preset-react", {"runtime": "automatic"}], // reactV17版本以上不用手动引入React
                '@babel/preset-typescript',
              ],
              plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                // ["import", { libraryName: "antd", "libraryDirectory": "es", style: 'css' }],
                "@babel/plugin-transform-runtime",
              ],
              cacheDirectory: true, // 开启babel编译缓存
              // cacheCompression: false, // 缓存文件不要压缩,减少压缩时间
            }
          },
        ]
      },
      {
        test: /\.less$/i,
        use: [stylesHandler, cssLoader, "postcss-loader", "less-loader"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, cssLoader, "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  performance: {
    hints: "warning", // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".less", ".css", ".json", "..."],
    alias: {
      '@': resolve('./src')
    }
  },
};

module.exports = () => {
  if (!isDev) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
