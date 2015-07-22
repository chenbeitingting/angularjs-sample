/**
 * @class js.modules.myAppCtrl
 * @descripeThe main share app controller module
 * @type{angular.module}
 */
var myAppCtrl=angular.module('myAppCtrl',[]);
myAppCtrl.run(['$rootScope',function($rootScope){
     /**
    *@desc 是否显示错误弹出框
    */
    $rootScope.error=false;
     /**
    *@desc 是否显示错误提示字段
    */
    $rootScope.errorMassage="";
    /**
    * @method hideBox -隐藏错误提示框
    *@desc 是否显示错误提示字段
    */
    $rootScope.hideBox=function(){
         $rootScope.error=false;
         $rootScope.errorMassage="";
    };
}]);

  /**
 * @class js.modules.myAppCtrl.addActCtrl - This controls add a acticity
 * @param {Object} $scope - The current scope
 * @param {Object} loginService - The service
 * @param {Object} $location
 * @example <div ng-controller="addActCtrl"></div>
 */
myAppCtrl.controller('addActCtrl',['$scope','loginService','$location','$rootScope',function($scope,loginService,$location,$rootScope){
    	 /**
      *@desc 活动详情字段
      */
      $scope.act={name:"",img:"../pc/images/img_up.jpg",address:"",price:"",telephone:"",activityInfo:"",id:"",startTime:"",endTime:""};
    	$scope.act.id=$location.search()['id'];

      /**
      *@method get a activity info
      */
     loginService.getActivity({id:$scope.act.id},function(succ){
            if(succ.code == 0){
                 succ.data[0]?$scope.act=succ.data[0]:$scope.act;
            }else{
                 $rootScope.error=true;
                 $rootScope.errorMassage="查询出错";
            }
        },function(error){
                $rootScope.error=true;
                $rootScope.errorMassage="请求异常";
        });

    /**
    *@method addActivity - add a new activity
    */
	 $scope.addActivity=function(){
         /**
      *@desc 是否操作成功字段
      */
	 	    $scope.addSuccess=false;
         if($scope.act.id){//修改
              loginService.modifyActivity({data:$scope.act},function(succ){
                  if(succ.code==0){
                      $scope.addSuccess=true;
                  }else{
                       $rootScope.error=true;
                       $rootScope.errorMassage="查询出错";
                  }
              },function(error){
                    $rootScope.error=true;
                    $rootScope.errorMassage="请求异常";
              });
          }else{//新增
              loginService.add({data:$scope.act},function(succ){
                  if(succ.code==0){
                      $scope.addSuccess=true;
                  }else{
                       $rootScope.error=true;
                       $rootScope.errorMassage="查询出错";
                  }
              },function(error){
                  $rootScope.error=true;
                  $rootScope.errorMassage="请求异常";
              });
          }

	 };
     /**
      *@method uploadImg - upload img for directive use
     */
     $scope.uploadImg=function(data){
             loginService.uploadImg({imgBase64:data},function(succ){
                  if(succ.code==0){
                      $scope.act.img=succ.data;
                  }else{
                      $rootScope.error=true;
                      $rootScope.errorMassage="查询出错";
                  }
              },function(error){
                  $rootScope.error=true;
                  $rootScope.errorMassage="请求异常";
              });
     };

}]);
  /**
 * @class js.modules.myAppCtrl.myAppCtrllistCtrl - This controls get activity list
 * @param {Object} $scope - The current scope
 * @param {Object} loginService - The service
 * @param {Object} $location
 * @param {Object} $window
 * @example <div ng-controller="listCtrl"></div>
 */
myAppCtrl.controller('listCtrl',['$scope','loginService','$location','$window',function($scope,loginService,$location,$window){		
        /**
        *@desc 列表页面字段
        */
        $scope.page={currentPage:1,totalPage:1,pageSize:5,endPage:1,totalNum:0,pages:[]};
        /**
        *@desc 是否搜索
        */
        $scope.search=true;
        /**
        *@method get total page
        */
          loginService.total(function(succ){
              if(succ.code==0){
                      var data=succ.data;
                      $scope.page.totalNum=Number(data[0].value);
                      $scope.page.totalPage=Math.ceil(Number(data[0].value) / Number($scope.page.pageSize));
                      $scope.page.endPage=$scope.page.totalPage;
                      $scope.load();
              }else{
                  $rootScope.error=true;
                  $rootScope.errorMassage="查询出错";
              }
          },function(error){
              $rootScope.error=true;
              $rootScope.errorMassage="请求异常";
          });
        /**
        *@method load page list
        *@desc load a page
        */
        $scope.load=function(){
            loginService.list({currentPage:$scope.page.currentPage,pageSize:$scope.page.pageSize},function(succ){
                  if(succ.code==0){
                       var data=succ.data;
                       $scope.acts=data;
                       /*生成数字链接*/
                        if ($scope.page.currentPage > 1 && $scope.page.currentPage < $scope.page.totalPage) {
                                $scope.page.pages = [
                                    $scope.page.currentPage - 1,
                                    $scope.page.currentPage,
                                    $scope.page.currentPage + 1
                                ];
                            } else if ($scope.page.currentPage == 1 && $scope.page.totalPage > 1) {
                                $scope.page.pages = [
                                    $scope.page.currentPage,
                                    $scope.page.currentPage + 1
                                ];
                            } else if ($scope.page.currentPage == $scope.page.totalPage && $scope.page.totalPage > 1) {
                                $scope.page.pages = [
                                    $scope.page.currentPage - 1,
                                    $scope.page.currentPage
                                ];
                              }
                  }else{
                      $rootScope.error=true;
                      $rootScope.errorMassage="查询出错";
                  }
            },function(error){
                $rootScope.error=true;
                  $rootScope.errorMassage="请求异常";
            });
        };
        
        /**
        *@method 
        *@desc next a page 
        */
        $scope.next=function(){
              if($scope.page.currentPage < $scope.page.totalPage){
                  $scope.page.currentPage++;
                  $scope.load();
              }
        };
        /**
        *@method  
        *@desc previous a page
        */
        $scope.prev = function () {
            if ($scope.page.currentPage > 1) {
                $scope.page.currentPage--;
                $scope.load();
            }
        };
        /**
        *@method   loadPage click number get a page
        *@param {number} index -the acticity tip in acticity list
        *@desc 页面按钮第几页点击  
        */
        $scope.loadPage = function (page) {
            $scope.page.currentPage = page;
            $scope.load();
        };
        /**
        *@method edit - edit a activity
        *@param {number} index -the acticity tip in acticity list
        *@param {number} id - The activity id
        *@desc 编辑按钮点击
        */
    		$scope.edit=function(index,id){
                 $location.path('/add').search({id: id});
    		};
        /**
        *@method delete - delete a activity
        *@param {number} index -the acticity tip in acticity list
        *@param {number} id - The activity id
        *@desc 删除按钮点击
        */
    		$scope.delete=function(index,id){
    			       $scope.addSuccess=false;
                  loginService.deleteActivity({id:id},function(succ){
                      if(succ.code==0){
                            $scope.acts.splice(index,1);
                            $scope.addSuccess=true;
                            $scope.page.totalNum--;
                            var newTotal=Math.ceil($scope.page.totalNum / Number($scope.page.pageSize));

                            if($scope.page.currentPage == $scope.page.totalPage && $scope.page.totalPage > newTotal){
                                  $scope.page.currentPage--;
                                  $scope.page.totalPage=newTotal;
                            }
                             $scope.load();
                      }else{
                          $rootScope.error=true;
                          $rootScope.errorMassage="查询出错";
                      }
                  },function(error){
                      $rootScope.error=true;
                      $rootScope.errorMassage="请求异常";
                  });
    		};
        /**
        *@method share - share a activity
        *@param {number} index  -the acticity tip in acticity list
        *@param {number} id - The activity id
        *@desc 分享按钮点击
        */
        $scope.share=function(index,id){
               $window.location.href="/users/shareActivity?id="+id+"";
        }

}]);


