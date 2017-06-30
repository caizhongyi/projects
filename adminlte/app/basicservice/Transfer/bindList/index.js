angular.module('basicservice.Transfer.transferList.config', [ 'basicservice.Transfer.transferList.service'])
    .config(["$provide",function($provide) {
        $provide.value('trunk', function() {
            return [
                {type:63089200, name: "转接273WEB站"},
                {type:63089201, name: "转接273M站"},
                {type:63089202, name: "转接273APP站"},
                {type:63089203, name: "全网发车"},
                {type:63089288, name: "测试"},
            ];
        });

        $provide.value('status', function() {
            return [
                {type:'success', name: "成功"},
                {type:'user_busy', name: "用户忙"},
                {type:'call_reject', name: "请求被拒"},
                {type:'invalid_number', name: "号码不可用"},
                {type:'no_answer', name: "无应答"},
                {type:'RECOVERY_ON_TIMER_EXPIRE', name: "请求超时"},
            ];
        });
    }]);
angular.module('basicservice.Transfer.transferList', [ 'basicservice.Transfer.transferList.service',"basicservice.Transfer.transferList.config","basicservice.Transfer.transferList.filter"])
    .controller('controller.basicservice.Transfer.transferList',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"identify" , "$state" , "utils"  ,"PAGINATION","$cookieStore" , "status","trunk",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,identify , $state , utils  ,PAGINATION, $cookieStore,status,trunk ){
            $scope.searchData = {} ;
            $scope.maxSize = PAGINATION.maxSize;
            $scope.searchCondition = $scope.searchCondition || {};
            var pageSize =  PAGINATION.pageSize ;
            var currentPage =  $stateParams.currentPage || PAGINATION.currentPage;

            $scope.searchData = $stateParams ;
            $scope.statusList = status();
            $scope.trunkList = trunk();

            var isChange = false;
            function getInfo(){
                identify.get( currentPage ,  pageSize ,  $scope.searchData ).success(function( res ){
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
                $scope.searchData.start_date = utils.dateFormat($scope.searchData.start_date)
                $scope.searchData.end_date = utils.dateFormat($scope.searchData.end_date)
                $scope.searchData.currentPage = $scope.currentPage ;
                console.log($scope.searchData)
                $state.go($state.current.name ,  $scope.searchData ,{ reload : true } );
                isChange = false ;
            }

            $scope.searchInfo = $scope.pageChanged = function(){
                flush ();
            };

            getInfo();

            /* $scope.add = function(){
             $state.go('identify-index-edittradedetail');
             }

             $scope.edit = function(){
             $state.go('identify-index-edittradedetail',{ id : this.item.id });
             }

             $scope.draft = function(){
             $state.go('identify-index-edittradedetail',{ id : this.item.id });
             }*/

            $scope.remove = function(){
                if(confirm("是否要删除？"))
                    identify.remove( this.item.id ).success(function( res ){
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
        }])
