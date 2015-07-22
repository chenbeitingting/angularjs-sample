/**
 * @class js.modules.myAppService
 * The main share app service module
 * @type{angular.module}
 */
var myAppService=angular.module('myAppService',{});
 /**
 * @method loginService - This service to get data
 * @param {Object} $resource 
 * @return {Object}
 */
myAppService.factory('loginService',['$resource',function($resource){
    return $resource('/users/:functionName', 
    	     {functionName:"@functionName",data:"@data"},
    	     {
                 list: {method:'GET', params:{functionName:'list'},responseType:'json'},
                 total:{method:'GET',params:{functionName:'total'},responseType:'json'},
                 getActivity:{method:'GET', params:{functionName:'getActivity'},responseType:'json'}
             });
}]);