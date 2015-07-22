/**
 *@class js.shareApp
 *The main share app route module
 *@type{angular.module}
 *@exampl <html ng-app="shareApp"></html>
 *@extends ngRoute,ngAnimate,infinite-scroll,ngResource,myAppDirective,myAppCtrl,myAppService
 */
var shareApp = angular.module('shareApp', [
  //   'angular-gestures',
     'ngRoute',
     'ngAnimate',
     'infinite-scroll',
     'ngResource',
     'myAppCtrl',
     'myAppService'
     
]);

shareApp.run(['$rootScope','$location','$window',function($rootScope,$location,$window){
     /**
     * Helper method for main page transitions. Useful for specifying a new page partial and an arbitrary transition.
     * @param  {String} path               The root-relative url for the new route
     * @param  {object} url data
     */
    $rootScope.go = function (path,data) {
        if (path === 'back') { // Allow a 'back' keyword to go to previous page
            $rootScope.pageAnimationClass="back";
            $window.history.back();
        }
        
        else { // Go to the specified path
             $rootScope.pageAnimationClass="view-frame";
             if(data){
                 $location.path(path).search(data);
             }else{
                 $location.path(path);
             }
            
        }
    };
}]);
/**
* @params {Object} $routeProvider
*/
shareApp.config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.
      when('/share', {
          templateUrl: '../telephone/views/single.html',
          controller:'singleShare'     
      }).when('/list',{
          templateUrl: '../telephone/views/list.html',
          controller:'listShare'  
      }).
      otherwise({
        redirectTo: '/share'
      });
      /**
       * app端应用tap事件
      
     hammerDefaultOptsProvider.set({
        recognizers: [[Hammer.Tap, {time: 250}]]
     });*/
}]);