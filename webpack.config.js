var webpack = require("webpack")

var exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

        './src/index.ts',
        // the entry point of our app
    ],
    output: {
        filename: 'bundle.js',
        path: __dirname,

        publicPath: '/'
            // necessary for HMR to know where to load the hot update chunks
    },

    devtool: "inline-source-map",

    devServer: {
        hot: true,
        // enable HMR on the server

        contentBase: __dirname,
        // match the output path

        publicPath: '/'
            // match the output `publicPath`
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
            //,{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
    ],
};

if (process.env.NODE_ENV === "production") {
    delete exports.devtool
}

module.exports = exports