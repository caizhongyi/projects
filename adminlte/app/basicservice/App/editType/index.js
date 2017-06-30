angular.module('basicservice.App.editType.config', [ 'basicservice.App.editType.service'])
    .config(["$provide",function($provide) {
        $provide.value('typestatus', function() {
            return [
                {type:1, name: "未上线"},
                {type:2, name: "屏蔽"},
            ];
        });
        $provide.value('charger', function() {
            return [
                {type:0, name: "WAP站"},
                {type:1, name: "app"},
                {type:2, name: "外包"},
                {type:3, name: "其他"},
            ];
        });
        $provide.value('channel', function() {
            return [
                {type:'GuoduSms', name: "国度"},
                {type:'WeilaiSms', name: "未来无线"},
            ];
        });
    }]);
angular.module('basicservice.App.editType', ['basicservice.App.editType.service', 'basicservice.App.editType.config'])
    .controller('controller.basicservice.App.editType',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"edittype" , "$state" , "utils"  ,"PAGINATION","$cookieStore" ,"typestatus","charger","channel",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,edittype , $state , utils  ,PAGINATION, $cookieStore,typestatus,charger,channel){
            $scope.channelList = channel();
            $scope.typestatusList = typestatus();
            $scope.chargerList = charger();
            $scope.item = $scope.item || {};
            
            function getInfo(){
            	edittype.get( $stateParams.id ).success(function( res ){
            		
            		$scope.item = res.data.list;
                })
               $(window).resize();
            }
            getInfo();
            
            
            $scope.ok = function () {
                var item = $scope.item ;
                
                if( item )
                	edittype.update( item ).success(function( res ){
                    if( res.data == '0' ){
                        $state.reload();
                    }
                    else{
                        angular.message( '操作成功' );
                    }
                }).error(function(){
                    angular.message('添加失败！');
                })
            };
        }])