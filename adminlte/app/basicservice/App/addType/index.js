angular.module('basicservice.App.addType.config', [ 'basicservice.App.addType.service'])
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
angular.module('basicservice.App.addType', ['basicservice.App.addType.service', 'basicservice.App.addType.config'])
    .controller('controller.basicservice.App.addType',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"addtype" , "$state" , "utils"  ,"PAGINATION","$cookieStore" ,"typestatus","charger","channel",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,addtype , $state , utils  ,PAGINATION, $cookieStore,typestatus,charger,channel){
            $scope.channelList = channel();
            $scope.typestatusList = typestatus();
            $scope.chargerList = charger();
            $scope.item = $scope.item || {};
            $scope.ok = function () {
                var item = $scope.item ;
                if( item )
                addtype.add( item ).success(function( res ){
                    if( res.data == '0' ){
                        //$modal.dismiss('cancel');
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