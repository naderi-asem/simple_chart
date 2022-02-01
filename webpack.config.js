const path = require('path');

module.exports = {
    entry : "./src/js/chart.js",
    output : {
        path : path.resolve(__dirname, "public"),
        filename : "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            }
        ],
    },
}