
/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
var user = require('./routes/user');

var http = require('http');
var path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.set('view engine', 'html');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'app')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//node.js路由
app.get('/',function(req,res){
	res.sendfile('app/pc/views/login.html');
});
app.get('/index',function(req,res){
	 res.sendfile('app/pc/index.html');
});
app.get('/users/shareActivity',function(req,res){
	 res.sendfile('app/telephone/share.html');
});


app.post('/users/login', user.checkLogin);
app.post('/users/add', user.addActivity);
app.get('/users/list',user.acticityList);
app.get('/users/total',user.acticityTotal);
app.get('/users/delete',user.deleteActivity);
app.get('/users/getActivity',user.getActivity);
app.post('/users/modifyActivity',user.modifyActivity);
app.post('/users/uploadImg',user.uploadImg);
//app.get('/users/shareActivity',user.shareActivity);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


