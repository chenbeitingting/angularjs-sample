/**
 * @class js.modules.myAppService
 * The main share app service module
 * @type{angular.module}
 */
var myAppService=angular.module('myAppService',{});
  /**
 * @class js.modules.myAppService.loginService - This service to get data
 * @param {Object} $resource 
 * @return {Object}
 */
myAppService.factory('loginService',['$resource',function($resource){
    return $resource('/users/:functionName', 
    	     {functionName:"@functionName",data:"@data"},
    	     {
                /**
                * @method list 
                * @desc -获取活动列表
                */
                 list: {method:'GET', params:{functionName:'list'},responseType:'json'},
                  /**
                    * @method total 
                    * @desc -活动总数
                    */
                 total:{method:'GET',params:{functionName:'total'},responseType:'json'},
                  /**
                    * @method getActivity 
                    * @desc -获取活动详情
                    */
                 getActivity:{method:'GET', params:{functionName:'getActivity'},responseType:'json'},
                   /**
                    * @method modifyActivity 
                    * @desc -修改活动
                    */
                 modifyActivity:{method:'POST',params:{functionName:'modifyActivity'},responseType:'json'},
                   /**
                    * @method add 
                    * @desc -新增活动
                    */
                 add:{method:'POST',params:{functionName:'add'},responseType:'json'},
                   /**
                    * @method deleteActivity 
                    * @desc -删除活动
                    */
                 deleteActivity:{method:'GET', params:{functionName:'delete'},responseType:'json'},
                    /**
                    * @method uploadImg 
                    * @desc -上传图片
                    */
                 uploadImg:{method:'post',params:{functionName:'uploadImg'},responseType:'json'}
             });
}]);
