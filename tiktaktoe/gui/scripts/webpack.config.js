const path = require("path");
const BUILD_DIR = path.resolve(__dirname, "../../static/dist/");
const APP_DIR = path.resolve(__dirname, "src/");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");

module.exports = {
    entry: APP_DIR + "/index.js",
    output: {
        path: BUILD_DIR,
        filename: "bundle.js"
    },
    plugins: [
        new ExtractTextPlugin("css/station.css"),
        new LiveReloadPlugin(),
    ],
    module: {
        rules: [
            {
                  test: /\.js$/,
                  loader: 'ify-loader'
              },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        "css-loader",
                        "sass-loader",
                    ]
                })
            },
        ],

    },
    resolve: {
        extensions: [".js", ".jsx", ".scss"],
    }
};
