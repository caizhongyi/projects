angular.module('basicservice.App.appInfo.config', [ 'basicservice.App.appInfo.service'])
    .config(["$provide",function($provide) {
        $provide.value('app', function() {
            return [
                {type:0, name: "开发中"},
                {type:1, name: "上线审核"},
                {type:2, name: "上线"},
                {type:3, name: "屏蔽"},
            ];
        });
    }]);
angular.module('basicservice.App.appInfo', [
    'basicservice.App.appInfo.service',
    'basicservice.App.appInfo.filter',
    'basicservice.App.appInfo.config'])
    .controller('controller.basicservice.App.appInfo',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"appinfo" , "$state" , "utils"  ,"PAGINATION","$cookieStore" ,"app",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,appinfo , $state , utils  ,PAGINATION, $cookieStore,app){
            $scope.searchData = {} ;
            $scope.maxSize = PAGINATION.maxSize;
            $scope.searchCondition = $scope.searchCondition || {};
            var pageSize =  PAGINATION.pageSize ;
            var currentPage =  $stateParams.currentPage || PAGINATION.currentPage;
            $scope.searchData = $stateParams ;
            var isChange = false;
            $scope.appList = app();
            function appTypeList() {
            	appinfo.getTypeList().success(function( res ) {
            		$scope.appTypeList = res.data;
                });
            }
            	
            function getInfo(){
                appinfo.get( currentPage ,  pageSize ,  $scope.searchData ).success(function( res ){
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
            appTypeList();

            $scope.addInfo = function () {
                $state.go('basicservice-App-addApp');
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
            	
                $state.go('basicservice-App-editApp', appList);
            };
            
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
                        	var ch_id     = $('#ch_id').val();//base_app_auth 表 id
                            var ch_status = $('#ch_status').val();//状态
                            var item      = [];
                            item.id       = ch_id;
                            item.status   = ch_status;
                            if(ch_id && ch_status){
                            	appinfo.update( item ).success(function( res ){
                                    if( res.data == '0' ){
                                        //$modal.dismiss('cancel');
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
