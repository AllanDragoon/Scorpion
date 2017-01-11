var webpack = require('webpack');
var WebPackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

var server = new WebPackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    progress: true,
    state:{
        colors: true
    }
});

server.app.get('*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

server.listen(8089, function(){
    console.log('正常打开8089端口');
});