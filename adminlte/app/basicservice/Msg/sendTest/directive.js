angular.module('basicservice.Msg.sendTest.directive', [
    "basicservice.Msg.sendTest.service"
])
   .directive("textarea" , [ "area","$stateParams" ,"$timeout" ,"cache", "$parse" ,function( area , $stateParams , $timeout , cache , $parse){
        
        return function($scope, ele, attrs){
        	
        	$scope.$watch('searchData.content',function(val) {
        			var char = val.replace(/[^\x00-\xff]/g, '**');
        			$scope.smslen = char.length;
        		});
   		};
        
    }])