const { resolve } = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev');
const PORT = process.env.PORT || 3000;

new WebpackDevServer(webpack(config), {
    contentBase: resolve(__dirname, 'public'),
    publicPath: '/dist/',
    hot: false,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    proxy: {
        "/api/*": {
          "target": "http://localhost/c219_sportsstats/public"
        }
      },
    stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: true,
        children: false,
        modules: false,
        chunks: false,
        chunkModules: false
    }
}).listen(PORT, function(err){
    if(err){
        console.log(err);
    }

    console.log('\x1b[36m%s\x1b[33m%s\x1b[0m', 'Dev server running at ', 'localhost:' + PORT);
    console.log('\x1b[32m%s\x1b[0m', '\nWebpack compiling...\n');
});
