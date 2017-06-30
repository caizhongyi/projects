angular.module('basicservice.VinSearch.getRecordList.config', [ 'basicservice.VinSearch.getRecordList.service'])
    .config(["$provide",function($provide) {
        $provide.value('status', function() {
            return [
                {type:0, name: "待定"},
                {type:-1, name: "购买失败"},
                {type:-2, name: "生成报告失败"},
                {type:1, name: "报告正在生成"},
                {type:9, name: "报告成功生成"},
            ];
        });
    }]);
angular.module('basicservice.VinSearch.getRecordList', [ 'basicservice.VinSearch.getRecordList.service',"basicservice.VinSearch.getRecordList.config","basicservice.VinSearch.getRecordList.filter"])
    .controller('controller.basicservice.VinSearch.getRecordList',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"identify" , "$state" , "utils"  ,"PAGINATION","$cookieStore" , "status",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,identify , $state , utils  ,PAGINATION, $cookieStore,status ){
            $scope.searchData = {} ;
            $scope.maxSize = PAGINATION.maxSize;
            $scope.searchCondition = $scope.searchCondition || {};
            var pageSize =  PAGINATION.pageSize ;
            var currentPage =  $stateParams.currentPage || PAGINATION.currentPage;

            $scope.searchData = $stateParams ;
            $scope.statusList = status();

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
            $scope.add = function(){
                $scope.addInfo( null , {} );
            }

            $scope.addInfo = function ( size , item ) {
                var modalInstance = $modal.open({
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

                });
            };

            $scope.buy = function(){
                identify.remove().success(function( res ){
                    if( res.code == 0){
                        $state.reload();
                    }
                    else{
                        angular.message( data.msg );
                    }
                }).error(function(){
                    angular.message('购买失败！');
                })
            }
        }])
    .controller('controller.modal.instance', [
        "$scope", "$rootScope" ,"$modalInstance" ,"item" , "work" , "$state" , "PAGINATION" ,"$stateParams","$cookieStore" ,
        function ( $scope, $rootScope ,$modalInstance ,item , work , $state , PAGINATION ,$stateParams ,$cookieStore ) {
            $scope.item = item;
            var currentPage =  $stateParams.currentPage || PAGINATION.currentPage;
            $scope.ok = function () {
                if( item )
                    work.add( $scope.item ).success(function( res ){
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

