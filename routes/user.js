
/*
 * GET users listing.
 */
var User=require('../models/User');
var fs = require("fs");

 /**
  *@method checkLogin
  *@desc 登陆检查
  *@param [object] req request参数
  *@param [object] res response参数
  *@return json code 0 success 1 error
  */
exports.checkLogin=function(req,res){
	var data = req.body; 
	var user = new User();
    user.checkLogin(data,function(err,result){
        if(err){
            res.send('{code:1,data:"error"');
        }else{
            result={code:0,data:result};
            res.json(result);
        }
        
        
    });
}
 /**
  *@method addACtivity
  *@desc 新增活动
  *@param [object] req request参数
  *@param [object] res response参数
  */
exports.addActivity=function(req,res){
     var data=req.body.data;
     console.log(data);
     var user = new User();
     user.addActivity(data,function(err,result){
        if(err){
            res.json('{code:1,data:'+err+'}');
        }else{
            result={code:0,data:result};
            res.json(result);
        }
    });
}
 /**
  *@method acticityList
  *@desc 活动列表
  *@param [object] req request参数
  *@param [object] res response参数
  */
exports.acticityList=function(req,res){
     var data=req.query;
     var user=new User();
     user.acticityList(data,function(err,result){
        if(err){
            res.json('{code:1,data:'+err+'}');
        }else{
            result={code:0,data:result};
            res.json(result);
        }
    });
}
 /**
  *@method acticityTotal
  *@desc 活动总数
  *@param [object] req request参数
  *@param [object] res response参数
  */
exports.acticityTotal=function(req,res){
     var user=new User();
     user.acticityTotal(function(err,result){
        if(err){
            res.json('{code:1,data:"error"}');
        }else{
            result={code:0,data:result};
            res.json(result);
        }
    });
}
 /**
  *@method deleteActivity
  *@desc 删除活动
  *@param [object] req request参数
  *@param [object] res response参数
  */
exports.deleteActivity=function(req,res){
    //var data=req.body;
    var data=req.query;
    console.log(data);
     var user = new User();
     user.deleteActivity(data,function(err,result){
         
         if(err){
            res.json('{code:1,data:'+err+'}');
        }else{
            result={code:0,data:result};
            res.json(result);
        }
    });
}
 /**
  *@method getActivity
  *@desc 获取活动详情
  *@param [object] req request参数
  *@param [object] res response参数
  */
exports.getActivity=function(req,res){
     var data=req.query;
     var user = new User();
     user.getActivity(data,function(err,result){
    /*    if(err){
            res.send('not found');
        }
        
        res.json(result);*/
        if(err){
            res.json('{code:1,data:"error"}');
        }else{
            result={code:0,data:result};
            res.json(result);
        }
    });
}
 /**
  *@method modifyActivity
  *@desc 修改活动
  *@param [object] req request参数
  *@param [object] res response参数
  */
exports.modifyActivity=function(req,res){
     var data=req.body.data;
     console.log(data);
     var user = new User();
     user.modifyActivity(data,function(err,result){
        if(err){
            res.json('{code:1,data:"error"}');
        }else{
            result={code:0,data:result};
            res.json(result);
        }
    });
}
 /**
  *@method uploadImg
  *@desc 上传图片
  *@param [object] req request参数
  *@param [object] res response参数
  */
exports.uploadImg=function(req,res){
     var imgData=req.body.imgBase64; 
      //过滤data:URL
     var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
     var dataBuffer = new Buffer(base64Data, 'base64');
     var imgName=Date.now();
     fs.writeFile("app/pc/images/"+imgName+".png", dataBuffer, function(err) {
        if(err){
            res.json('{code:1,data:'+err+'}');
        }else{
           res.send({code:0,data:"/pc/images/"+imgName+".png"});
        }
     });
}