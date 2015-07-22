/**
 * @class js.modules.myAppDirective
 * The main share app directive module
 * @type{angular.module}
 */
var myAppDirective=angular.module('myAppDirective',[]);

/**
 * @class js.modules.myAppDirective.fileUploader 
 * @desc 隐藏上传图片按钮，点击img，触发input=file的click事件
 * @example <div file-uploader></div>
 * @return {[object]} 
 */
myAppDirective.directive('fileUploader',function(){
    return {
      restrict: 'A',
    	template: '<img ng-src="{{act.img}}" ng-click="uploadFile()" id="uploadImg"><input ng-model="act.img"  custom-on-change="uploadImage" type="file" id="imgFile" class="hidec">',
      link:function($scope,$element,$attrs){
             /**
              * @method  uploadFile
              * 
              */
             $scope.uploadFile=function(){
                  $element.find('input')[0].click();
             };
    	}
    };
});
/**
 * @class js.modules.myAppDirective.customOnChange 
 * @desc 绑定input=file的change事件,并转换成文件流
 * @example <input type="file" customOnChange>
 * @return {[object]} 
 */
myAppDirective.directive('customOnChange',['$parse',function($parse) {
  return {
    restrict: "A",
    link: function ($scope, $element, $attrs) {
      /**
       * @method 
       */
      $element.bind('change', function(){
            var file= document.getElementById('imgFile').files[0];
            //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件 
            if(!/image\/\w+/.test(file.type)){ 
                alert("请确保文件为图像类型"); 
                return false; 
            } 
            var reader = new FileReader(); 
            reader.readAsDataURL(file); 
            reader.onload = function(e){ 
               $('#imgFile').prev("img").attr("src",this.result);
                var fn = $parse($scope.uploadImg); //调用controller中的方法
                fn(this.result)
               
            };
       });
    }
  };
}]);
/**
 *  @class js.modules.myAppDirective.catalogueClick
 * @desc tap标签切换
 *     @example <div catalogueClick></div>
 * @return {[object]} 
 */
myAppDirective.directive('catalogueClick',['$location',function($location){
    return{
      restrict:"A",
      link:function($scope,$element,$attrs){       
          $element.bind("click",function(evt){
              $element.addClass('nav-list-bg').siblings('li').removeClass('nav-list-bg');
              $scope.$apply(function(evt){
                 var someattr=$attrs.someAttr;
                 $location.path(someattr);
              });
          });
      }
    };
}]);

/**
 * @class js.modules.myAppDirective.showSuccess
 * @desc 监听showSuccess的变化
 * @example <div showSuccess></div>
 * @return {[object]} 
 */
myAppDirective.directive('showSuccess',['$timeout',function($timeout){
     return{
        restrict:"A",
        link:function($scope,$element,$attr){
            $scope.$watch(function(){
                return $attr.someAttr;
            },function(newVal,oldCal){
                if(newVal=="true"){
                    $element.next("div").addClass("succshow");    
                    $timeout(function(){
                         $element.next("div").removeClass("succshow"); 
                    },2000);
                }
                
            });
        }

     }
}]);
/**
 * @class js.modules.myAppDirective.showSuccess
 * @desc 监听myDatePicker事件
 * @example <div start-picker></div>
 * @return {[object]} 
 */
myAppDirective.directive('startPicker',['$filter',function($filter){
   var dataFilter=$filter('date');
   return{
      restrict:"A",
      link:function($scope,$element,$attr){
          $element.bind("click",function(){
              window.WdatePicker({
                 onpicker:function(){$scope.digest();}
              });
          });
          $scope.$watch(
              function(){return $element[0].value;},
              function(newVal){
                 if($attr.name=="startTime"){
                    newVal=dataFilter(newVal,'yyyy-MM-dd');
                    $scope.act.startTime=newVal;
                 }else{
                    newVal=dataFilter(newVal,'yyyy-MM-dd');
                    $scope.act.endTime=newVal;
                 }
              }
          );
      }
   }
}]);
/**
 * @class js.modules.myAppDirective.querySearch
 * @desc 查询时隐藏分页
 * @example <input query-search type="text"/>
 * @return {[object]} 
 */
myAppDirective.directive('querySearch',function(){
     return{
        restrict:"A",
        link:function($scope,$element,$attr){
            $scope.$watch(function(){
                return $element[0].value;
            },function(newVal){
                if(newVal!=""){
                   $scope.search=false;
                }else{
                    $scope.search=true;
                }
            });
        }

     }
});


