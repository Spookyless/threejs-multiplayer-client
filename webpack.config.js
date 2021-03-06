var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    devServer: {
        port: 8080
    },
    mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: './index.html',
            template: './src/index.html',
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(fbx|gltf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(ttf)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[hash]-[name].[ext]',
                        }
                    }
                ]
            }
        ]
    },
};