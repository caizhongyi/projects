angular.module('basicservice.Token.tokenInfo.config', [ 'basicservice.Token.tokenInfo.service'])
    .config(["$provide",function($provide) {
        $provide.value('channel', function() {
            return [
                {type:"WeilaiSms", name: "未来"},
                {type:"GuoduSms", name: "国都"},
            ];
        });
    }]);angular.module('basicservice.Token.tokenInfo', [ 'basicservice.Token.tokenInfo.service','basicservice.Token.tokenInfo.config'])
    .controller('controller.basicservice.Token.tokenInfo',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"token" , "$state" ,"channel",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,token , $state,channel ){
            function getInfo(){
                token.get().success(function( res ){
                    $scope.applist = res.data.list;
                    $(window).resize();
                })
            }
            getInfo();
            $scope.ok = function () {
                var item = $scope.item || {};
                var arr = [] ;
                for(var i=0; i < $scope.applist.length ; i++) {
                    if($scope.applist[i].checked) {
                        arr.push($scope.applist[i].id);
                    }
                }
                $scope.item.appId  =  arr.join(',');
                $scope.item = $.extend({} , $scope.item , $scope.smsData )
                if( item )
                token.add( $scope.item ).success(function( res ){
                    if( res.code == 0 ){
                        //$modal.dismiss('cancel');
                        $state.reload();
                    }
                    else{
                        angular.message( res.msg );
                    }
                }).error(function(){
                    angular.message('添加失败！');
                })
            };
            $scope.channelList = channel();
            $scope.smsok = function() {
                if(this.module.id == 1 && this.module.checked) {
                    addInfo = function ( size , item ) {

                        var modalInstance = $modal.open({
                            templateUrl: 'tpl-add.html',
                            controller: 'controller.modal.instance',
                            size: size,
                            resolve: {
                                item: function () {
                                    return item;
                                },
                                parentScope : function(){
                                    return $scope;
                                }
                            }
                        });

                        //弹出结果
                        modalInstance.result.then(function () {
                            //   $scope.selected = selectedItem;
                        }, function () {

                        });
                    }
                   addInfo();
                }
            };

        }])
    .controller('controller.modal.instance', [
        "$scope", "$rootScope" ,"$modalInstance" ,"item" , "token" , "$state" , "PAGINATION" ,"$stateParams","$cookieStore" ,"channel", "parentScope",
        function ( $scope, $rootScope ,$modalInstance ,item , token , $state , PAGINATION ,$stateParams ,$cookieStore ,channel , parentScope) {
            $scope.item = $.extend({} , $scope.item, item);
            $scope.channelList = channel();
            var currentPage =  $stateParams.currentPage || PAGINATION.currentPage;

            $scope.addok = function () {
                if(  $scope.item ){
                    parentScope.smsData = $scope.item;
                }
                $modalInstance.dismiss('cancel');
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }])

