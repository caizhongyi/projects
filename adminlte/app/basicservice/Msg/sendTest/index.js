angular.module('basicservice.Msg.sendTest.config', [ 'basicservice.Msg.sendTest.service'])
    .config(["$provide",function($provide) {
        $provide.value('channelC', function() {
            return [
                {type:'国度', channel: "GuoduSms"},
                {type:'未来无线', channel: "WeilaiSms"},
                {type:'国度群发', channel: "GuoduMassSms"},
            ];
        });
    }]);
angular.module('basicservice.Msg.sendTest', [ 'basicservice.Msg.sendTest.service',"basicservice.Msg.sendTest.config","basicservice.Msg.sendTest.filter"])
    .controller('controller.basicservice.Msg.sendTest',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"countD" , "$state" , "utils"  ,"PAGINATION","$cookieStore", "channelC",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,countD , $state , utils  ,PAGINATION, $cookieStore, channelC) {
    		$scope.channelListB = channelC();
    		$scope.searchData  = $stateParams;
            function getInfo() {
            	//console.info($scope.searchData);
            	countD.get($scope.searchData).success(function( res ) {
                    $scope.list = res.data;
                    $(window).resize();
                })
            }
            getInfo();
            var isChange = false;
            function flush (){
            	countD.call($scope.searchData).success(function( res ) {
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