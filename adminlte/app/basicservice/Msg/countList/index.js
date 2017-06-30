angular.module('basicservice.Msg.countList.config', [ 'basicservice.Msg.countList.service'])
    .config(["$provide",function($provide) {
        $provide.value('msgchannel', function() {
            return [
                {type:'GuoduSms', name: "国度"},
                {type:'VcomcnSms', name: "即时通"},
                {type:'WeilaiSms', name: "未来无线"},

            ];
        });
    }]);
angular.module('basicservice.Msg.countList', [ 'basicservice.Msg.countList.service',"basicservice.Msg.countList.config","basicservice.Msg.countList.filter"])
    .controller('controller.basicservice.Msg.countList',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"countU" , "$state" , "utils"  ,"PAGINATION","$cookieStore" ,"msgchannel",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,countU , $state , utils  ,PAGINATION, $cookieStore,msgchannel ){
            $scope.msgchannelList = msgchannel();
            var item = [{type:'GuoduSms', name: "国度"},
                        {type:'WeilaiSms', name: "未来无线"},];
            function getInfo(){
            	
            	countU.get(item).success(function( res ){
            		countU.getBlackList(item).success(function( res ){
                        $scope.GuoduSmsList = res.data['GuoduSms']['status'];
                        //if($scope.GuoduSmsList == '1') {
                        	//$scope.GuoduSmsSt = false;
                        //} else {
                        //	$scope.GuoduSmsSt = true;
                        //}
                        
                        $scope.WeilaiSmsList = res.data['WeilaiSms']['status'];
                        
                        //if($scope.WeilaiSmsList == '1') {
                        //	$scope.WeilaiSmsSt = false;
                        //} else {
                        //	$scope.WeilaiSmsSt = true;
                        //}
                        
                    })
            		
                    $scope.list = res.data;
                    $(window).resize();
                })
            }
            getInfo();
            
            
            $scope.confirm = function(status, channel){
            	$scope.ch_status  = status;
            	$scope.ch_channel = channel;
                $modal.open({
                    templateUrl: "tpl-confirm.html" ,
                    resolve: {
                        item: function () {
                            return $scope;
                        }
                    },
                    size:  'md',
                    controller:   [  "$scope", "$rootScope", "$state", "$filter", "$modalInstance",
                        function( $scope, $rootScope, $state ,$filter, $modalInstance){
                    	
                        $scope.check_ok = function(){
                        	
                            var ch_status  = $('#ch_status').val();//状态
                            var ch_channel = $('#ch_channel').val();//短信通道
                            
                            var item       = [];
                            item.status    = ch_status;
                            item.channel   = ch_channel;
                            
                            if(ch_status){
                            	countU.update( item ).success(function( res ){
                                    if( res.data == '0' ){
                                        //$modal.dismiss('cancel');
                                        $state.reload();
                                    }
                                    else{
                                        angular.message( '操作成功' );
                                        $modalInstance.dismiss('cancel');
                                        $state.reload();
                                    }
                                }).error(function(){
                                    angular.message('添加失败！');
                                })
                            }
                        };
                        
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        };
                    	
                    }]
                    
                });
            };
            
        }])

