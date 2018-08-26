const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");//自动拷贝插件
var CleanWebpackPlugin=require('clean-webpack-plugin');

module.exports={
    entry:"./src/index.js",
    output:{
        path:path.resolve(__dirname,"build"),
        filename:"js/boundle.js"
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"./src/index.html"
        }),
        new Webpack.ProvidePlugin({
            React:'react',
            ReactDOM:'react-dom',
            PT:'prop-types'
        }),
        new CleanWebpackPlugin(['build'])
        
    ],
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test: /\.jsx?$/,//表示要编译的文件的类型，这里要编译的是js文件
                loader: 'babel-loader',//装载的哪些模块
                exclude: /node_modules/,//标识不编译node_modules文件夹下面的内容
                query: {//具体的编译的类型，
                    compact: false,//表示不压缩
                    presets: [ 'react']//我们需要编译的是react
                }
    
            },
            {
                test:/\.(jpg|png|gif)$/,
                loader:'file-loader',
                options:{
                    name:'img/[name]_hash.[ext]'
                }
            }
    ]
    },
    resolve:{
        extensions:['.js','.css','.jsx'],
    }
}