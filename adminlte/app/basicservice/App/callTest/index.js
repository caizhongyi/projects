angular.module('basicservice.App.callTest.config', [ 'basicservice.App.callTest.service'])
    .config(["$provide",function($provide) {
        $provide.value('channel', function() {
            return [
                {type:'云之讯', channel: "ucpaas"},
                {type:'轻码云', channel: "qingmayun"}
            ];
        });
    }]);
angular.module('basicservice.App.callTest', [ 'basicservice.App.callTest.service',"basicservice.App.callTest.config","basicservice.App.callTest.filter"])
    .controller('controller.basicservice.App.callTest',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"count" , "$state" , "utils"  ,"PAGINATION","$cookieStore", "channel",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,count , $state , utils  ,PAGINATION, $cookieStore, channel) {
    		$scope.channelList = channel();
    		$scope.searchData  = $stateParams;
            function getInfo() {
            	//console.info($scope.searchData);
            	count.get($scope.searchData).success(function( res ) {
                    $scope.list = res.data;
                    $(window).resize();
                })
            }
            getInfo();
            var isChange = false;
            function flush (){
            	count.call($scope.searchData).success(function( res ) {
                    alert(res.msg);
                })
            }

            $scope.searchInfo =  function(){
                flush ();
            };
            
            $scope.searchChange = function(){
                isChange = true ;
            }
}])