angular.module('basicservice.App.typeInfo.config', [ 'basicservice.App.typeInfo.service'])
    .config(["$provide",function($provide) {
        $provide.value('appstatus', function() {
            return [
                {type:0, name: "已上线"},
                {type:1, name: "未上线"},
                {type:2, name: "屏蔽"},
            ];
        });
    }]);
angular.module('basicservice.App.typeInfo', [ 'basicservice.App.typeInfo.service','basicservice.App.typeInfo.filter','basicservice.App.typeInfo.config'])
    .controller('controller.basicservice.App.typeInfo',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"apptype" , "$state" , "utils"  ,"PAGINATION","$cookieStore" ,"appstatus",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,apptype , $state , utils  ,PAGINATION, $cookieStore,appstatus){
            $scope.searchData = {} ;
            $scope.maxSize = PAGINATION.maxSize;
            $scope.searchCondition = $scope.searchCondition || {};
            var pageSize =  PAGINATION.pageSize ;
            var currentPage =  $stateParams.currentPage || PAGINATION.currentPage;
            $scope.searchData = $stateParams ;
            var isChange = false;
            $scope.appstatusList = appstatus();
            function getInfo(){
                apptype.get( currentPage ,  pageSize ,  $scope.searchData ).success(function( res ){
                    $scope.list = res.data.list;
                    $scope.totalItems = res.data.total;
                    $scope.currentPage = currentPage;
                    $scope.totbalPage =  $scope.totalItems % pageSize  ;
                    $(window).resize();
                })
            }

            $scope.searchChange = function(){
                isChange = true ;
            }

            function flush (){
                if( isChange )  $scope.currentPage = 0 ;
                $scope.searchData.currentPage = $scope.currentPage ;
                $state.go($state.current.name ,  $scope.searchData ,{ reload : true } );
                isChange = false ;
            }

            $scope.searchInfo = $scope.pageChanged = function(){
                flush ();
            };

            getInfo();

            $scope.addInfo = function () {
                $state.go('basicservice-App-addType');
                /*var modalInstance = $modal.open({
                    templateUrl: 'tpl-add.html',
                    controller: 'controller.modal.instance',
                    size: size,
                    resolve: {
                        item: function () {
                            return item;
                        },
                        currentPage : function(){
                            return currentPage;
                        }
                    }
                });

                //弹出结果
                modalInstance.result.then(function () {
                    //   $scope.selected = selectedItem;
                }, function () {

                });*/
            };
            
            $scope.editInfo = function () {
            	var appList = this.appList;
                $state.go('basicservice-App-editType', appList);
            };

            $scope.remove = function(){
                if(confirm("是否要删除？"))
                   app.remove( this.item.id ).success(function( res ){
                        if( res.code == 0){
                            $state.reload();
                        }
                        else{
                            angular.message( data.msg );
                        }
                    }).error(function(){
                        angular.message('删除失败！');
                    })
            }
            
            
            $scope.confirm = function(status){
            	
            	var appList      = this.appList;
            	$scope.ch_id     = appList.id;
            	$scope.ch_status = status;
            	
                $modal.open({
                    templateUrl: "tpl-confirm.html" ,
                    resolve: {
                        item: function () {
                            return appList;
                        }
                    },
                    size:  'md',
                    controller:   [  "$scope", "$rootScope", "$state", "$filter", "$modalInstance",
                        function( $scope, $rootScope, $state ,$filter, $modalInstance){
                    	
                        $scope.check_ok = function(){
                        	var ch_id     = $('#ch_id').val();//base_app 表 id
                            var ch_status = $('#ch_status').val();//状态
                            
                            var item      = [];
                            item.id       = ch_id;
                            item.status   = ch_status;
                            if(ch_id && ch_status){
                            	
                            	apptype.update( item ).success(function( res ){
                                    if( res.data == '0' ){
                                        $state.reload();
                                    }
                                    else{
                                        angular.message( '操作成功' );
                                        $modalInstance.dismiss('cancel');
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
    .controller('controller.modal.instance', [
        "$scope", "$rootScope" ,"$modalInstance" ,"item" , "apptype" , "$state" , "PAGINATION" ,"$stateParams","$cookieStore" ,"appstatus",
        function ( $scope, $rootScope ,$modalInstance ,item , apptype , $state , PAGINATION ,$stateParams ,$cookieStore,appstatus ) {
            $scope.item = item;
            var currentPage =  $stateParams.currentPage || PAGINATION.currentPage;
            $scope.appstatusList = appstatus();
            $scope.ok = function () {
                if( item )
                    apptype.add( $scope.item ).success(function( res ){
                        if( res.code == 0 ){
                            $modalInstance.dismiss('cancel');
                            if( currentPage == 0 )
                                $state.reload();
                            else
                                $state.go($state.current.name , { currentPage : 0 , searchName : '' });
                        }
                        else{
                            angular.message( res.msg );
                        }
                    }).error(function(){
                        angular.message('添加失败！');
                    })
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            
        }])
