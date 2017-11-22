var webpack = require("webpack")

var exports = {
    entry: [
        './src/index.js',
        // the entry point of our app
    ],
    output: {
        filename: 'bundle.js',
        path: __dirname,
        library: 'IndexedDBStorage',

        publicPath: '/'
            // necessary for HMR to know where to load the hot update chunks
    },

    devtool: "inline-source-map",

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