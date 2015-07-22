/**
 * @class js.modules.myAppCtrl
 *The main share app controller module
 * @type{angular.module}
 */
var myAppCtrl=angular.module('myAppCtrl',[]);
 /**
 * @method  start
 * @param {Object} $rootScope
 * @param {Object} $window 
 * @param {Object} $location
 */
myAppCtrl.run(['$rootScope','$location','$window',function($rootScope,$location,$window){
	$rootScope.list=false;
	$rootScope.title="";
	$rootScope.shareImg="";


	 /**
	 * @method  activityList
	 * @desc get a activity list
	 */
    $rootScope.activityList=function(){
    	 $rootScope.list=true;
    	 $rootScope.go("/list");
	    // $location.path("/list");
	};
	 /**
	 * @method  back
	 * @desc back previous page
	 */
	$rootScope.back=function(){
        $rootScope.go("back");
        // $window.history.back();
	};
}]);

  /**
 * @method singleShare - This controls activity info
 * @param {Object} $scope - The current scope
 * @param {Object} loginService - The service
 * @param {Object} $location
 * @param {Object} $rootScope
 * @example <div ng-controller="singleShare"></div>
 */
myAppCtrl.controller('singleShare',['$scope','$location','loginService','$rootScope','$window',function($scope,$location,loginService,$rootScope,$window){    
       //  活动ID 
       var urlId=$location.search()['uid'];
       $rootScope.list=false;
       
       if(!urlId){
      	  urlId=location.search.split("?")[1].split("#")[0].split("=")[1];
       }

	      loginService.getActivity({id:urlId},function(succ){
	          if(succ.code == 0){
	          	//  $window.scroll(0,0);
	              $scope.act =succ.data[0];
	              $rootScope.title=$scope.act.name;
	              $rootScope.shareImg="http://99.48.6.200:3000"+$scope.act.img+"";
	          
	   
	          }else{
	              console.log("查询出错");
	          }
	      },function(error){
	            console.log(error);
	      });

}]);
  /**
 * @method listShare - activity list
 * @param {Object} $scope - The current scope
 * @param {Object} loginService - The service
 * @param {Object} $location
 * @param {Object} $rootScope
 * @example <div ng-controller="listShare"></div>
 */
myAppCtrl.controller('listShare',['$scope','$location','loginService','$rootScope','$window',function($scope,$location,loginService,$rootScope,$window){
//	 $window.scroll(0,0);
	 //控制more是否显示
	 $rootScope.list=true;
	 //下拉刷新标记
	 $scope.pull=false;
	 $scope.page={busy:false,currentPage:1,totalPage:1,pageSize:7,endPage:1,pages:[]};
	 $scope.acts=[],$scope.demo={},$scope.demo.busy=false;
	 //分享title
	 $rootScope.title="春暖花开，上海四月好去处";
	 //分享img
	  $rootScope.shareImg="http://99.48.6.200:3000/pc/images/12.jpg";
	 /*
	 loginService.total(function(data){
            $scope.page.totalPage=Math.ceil(Number(data[0].value) / Number($scope.page.pageSize));
            $scope.page.endPage=$scope.page.totalPage;
     });*/
          loginService.total(function(succ){
	          if(succ.code == 0){
	              var data =succ.data;
	              $scope.page.totalPage=Math.ceil(Number(data[0].value) / Number($scope.page.pageSize));
                  $scope.page.endPage=$scope.page.totalPage;
	          }else{
	              console.log("查询出错");
	          }
	      },function(error){
	            console.log(error);
	      });
    /**
    *@method share -  activity info
    */
	 $scope.share=function(id){ 
	 	   $rootScope.list=false;
	 	   var obj={'uid':id};
	 	  $rootScope.go("/share",obj);
	 	  // $location.path("/share").search({"uid":id});
	 };
	/**
    *@method nextPage -  pull up to freash
    */
	 $scope.nextPage=function(){
	 	    if($scope.pull) return;
	 	    else{
	 	    	$scope.pull=true;
                 loginService.list({currentPage:$scope.page.currentPage,pageSize:$scope.page.pageSize},function(succ){
			          if(succ.code == 0){
			                   var data =succ.data;
			                   for (var i = 0; i < data.length; i++) {
							          $scope.acts.push(data[i]);
							   }
							   $scope.page.currentPage++;
							   $scope.pull=false;
			          }else{
			              console.log("查询出错");
			          }
			      },function(error){
			            console.log(error);
			      });
	        }
	 };
     
}]);