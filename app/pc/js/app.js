/**
 *@class js.modules.shareApp
 *@descripe The main share app route module
 *@type {angular.module}
 *     @example
 *     <html ng-app="shareApp"></html>
 *@requires ngRoute
 *@requires ngResource
 *@requires myAppDirective
 *@requires myAppCtrl
 *@requires myAppService
 *@requires ngAnimate
 *@author ChenBei
 */
var shareApp = angular.module('shareApp', [
  'ngRoute',
  'ngAnimate',
  'ngResource',
  'myAppFilter',
  'myAppDirective',
  'myAppCtrl',
  'myAppService'
]);

/**
* @method $routeProvider - the route for url
* @params {Object} $routeProvider
*/
shareApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/add', {
           controller: 'addActCtrl',
           templateUrl: 'pc/views/add.html'
        }).when('/list',{
           templateUrl:'pc/views/list.html',
           controller:'listCtrl'
        }).
        otherwise({
          redirectTo: '/add'
        });
}]);