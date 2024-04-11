const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    entry: "./src/index.jsx",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: ["postcss-preset-env"]
                        }
                    }
                }]
            },
            {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, './src'),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html")
    }), new ReactRefreshWebpackPlugin()],
    mode: "development",
    target: 'web',
    devtool: "cheap-module-source-map",
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        hot: true,
        open: true,
        https: true,
        historyApiFallback: true,
    },
}