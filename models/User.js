
var db=require('./database');
var _=require('underscore');
var User=function(){};


User.prototype={
  /**
  *@method checkLogin
  *@desc 登陆检查
  *@param [object] data {username:'admin',password:'admin'}
  *@param [function] callback
  */
   checkLogin:function(data,callback){
         var sql = "SELECT * FROM users WHERE name =? and password=?";
         db.pool.getConnection(function(err, connection) {
            if (err) {
                callback(true);
                console.log("连接出错");
                return;
            }
            // make the query
            connection.query(sql, [data.username,data.password],function(err, results) {
                if (err) {
                    callback(true);
                    console.log("查询出错");
                    return;
                }
                connection.release();
                callback(false, results);
            });
     });
   },
  /**
  *@method addActivity
  *@desc 新增活动
  *@param [object] data {name:'……',img:'……'}
  *@param [function] callback
  */
   addActivity:function(data,callback){
          console.log(data);
          var sql = "INSERT INTO activitys set name=?,img=?,address=?,price=?,telephone=?,activityInfo=?,startTime=?,endTime=?";
          db.pool.getConnection(function(err, connection) {
            if (err) {
           
                callback(true);
                console.log("连接出错");
                return;
            }
            // make the query
            connection.query(sql, [data.name,data.img,data.address,data.price,data.telephone,data.activityInfo,data.startTime,data.endTime],function(err, results) {
                if (err) {
                    callback(true);
                    console.log("查询出错");
                    return;
                }
                connection.release();
                callback(false, results);
            });
     });
   },
    /**
  *@method acticityList
  *@desc 活动列表
  *@param [object] data {currentPage:1,pageSize:4}
  *@param [function] callback
  */
   acticityList:function(data,callback){
        var sql = "SELECT * FROM activitys limit ?,?";
        var startNum=Math.abs((data.currentPage-1)*data.pageSize);
        var endNum=Math.abs(data.pageSize);
         console.log(startNum+"@"+endNum);
        db.pool.getConnection(function(err, connection) {
            if (err) {
                callback(true);
                console.log("连接出错");
                return;
            }
            // make the query
            connection.query(sql, [startNum,endNum],function(err, results) {
                if (err) {
                    callback(true);
                    console.log("查询出错");
                    return;
                }
                connection.release();
                callback(false, results);
            });
        });
   },
     /**
  *@method acticityTotal
  *@desc 活动总数
  *@param [function] callback
  */
   acticityTotal:function(callback){
        var sql = "select count(*) as value from activitys";
        db.pool.getConnection(function(err, connection) {
            if (err) {
                callback(true);
                console.log("连接出错");
                return;
            }
            // make the query
            connection.query(sql, [],function(err, results) {
                if (err) {
                    callback(true);
                    console.log("查询出错");
                    return;
                }
                connection.release();
                callback(false, results);
            });
        });
   },
  /**
  *@method deleteActivity
  *@desc 删除活动
  *@param data {id：1}
  *@param [function] callback
  */
   deleteActivity:function(data,callback){
        
         var sql = "DELETE FROM activitys WHERE id = ?";
        // var sql="SELECT * FROM users WHERE username ='admin' AND PASSWORD='admin'";
          // get a connection from the pool
         db.pool.getConnection(function(err, connection) {
              if (err) {
                  callback(true);
                  console.log("连接出错");
                  return;
              }
              // make the query
              connection.query(sql, [data.id],function(err, results) {
                  if (err) {
                      callback(true);
                      console.log("查询出错");
                      return;
                  }
                  connection.release();
                  callback(false, results);
              });
       });
   },
    /**
  *@method getActivity
  *@desc 获取活动详情
  *@param data {id：1}
  *@param [function] callback
  */
   getActivity:function(data,callback){
         
         var sql = "SELECT * FROM activitys WHERE id=?";
         db.pool.getConnection(function(err, connection) {
              if (err) {
                  callback(true);
                  console.log("连接出错");
                  return;
              }
              connection.query(sql, [data.id],function(err, results) {
                  if (err) {
                      callback(true);
                      console.log("查询出错");
                      return;
                  }
                  connection.release();
                  callback(false, results);
            }); 
         });
   },
      /**
  *@method modifyActivity
  *@desc 修改活动详情
  *@param data {id：1,name:"……"}
  *@param [function] callback
  */
   modifyActivity:function(data,callback){
          console.log(data);
          var sql = "update activitys set name=?,img=?,address=?,price=?,telephone=?,activityInfo=? where id=?";
          db.pool.getConnection(function(err, connection) {
            if (err) {
                callback(true);
                console.log("连接出错");
                return;
            }
            // make the query
            connection.query(sql, [data.name,data.img,data.address,data.price,data.telephone,data.activityInfo,data.id],function(err, results) {
                if (err) {
                    callback(true);
                    console.log("查询出错");
                    return;
                }
                connection.release();
                callback(false, results);
            });
     });
   }
}; 
module.exports = User;