const path=require('path');
const HtmlWebpackPlugin=require("html-webpack-plugin");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyWebpackPlugin=require("copy-webpack-plugin");
const webpack=require('webpack');
module.exports={
    entry:'./src/js/index.js',
    output:{
        path:path.resolve(__dirname,"build"),
        filename:'js/bundle.js'
    },
    module:{
		loaders:[{
            test:/\.css$/,
            loader:'style-loader!css-loader'
        },  {
			test:/\.(jpg|png|gif)$/,
			loader:'file-loader'
        },
        {
			test:/\.(eot|svg|ttf|woff|woff2)$/,
			loader:'file-loader'
	       },
        {
            test: /\.jsx?$/,//表示要编译的文件的类型，这里要编译的是js文件
            loader: 'babel-loader',//装载的哪些模块
            exclude: /node_modules/,//标识不编译node_modules文件夹下面的内容
            query: {//具体的编译的类型，
                compact: false,//表示不压缩
                presets: [ 'react']//我们需要编译的是react
            }
        }]
    },
    resolve:{
              extensions:['.jsx','.css','.js']
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"./src/index.html"
        }),
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
           }),
           new webpack.ProvidePlugin({
            React:'react',
            ReactDOM:'react-dom'
        }),
        new CopyWebpackPlugin([{
            from: __dirname + '/src/js/json',
            to:__dirname+"/build/json"
            }])

      ]
  


}