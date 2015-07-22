/**
 * @class js.modules.myAppFilter
 *The main share app filter module
 * @type{angular.module}
 */
var myAppFilter=angular.module('myAppFilter',[]);

/**
* @desc price is or not free
*/
myAppFilter.filter('free',function(){
	  return function(price){        
           return price==0?"免费":price;
	  };
});