/**
*@desc 数据库连接
*/
var mysql=require('mysql');
var config=require('../dataConfig/config');
var pool=mysql.createPool(config.mysql_dev);
exports.pool=pool;