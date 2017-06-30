
angular.module('basicservice.Work.workType', [ 'basicservice.Work.workType.service'])
    .controller('controller.basicservice.Work.workType',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"work" , "$state" , "utils"  ,"PAGINATION","$cookieStore" ,
        function( $scope,$rootScope, $stateParams, $modal ,$log ,work , $state , utils  ,PAGINATION, $cookieStore){
            $scope.searchData = {} ;
            $scope.maxSize = PAGINATION.maxSize;
            $scope.searchCondition = $scope.searchCondition || {};
            var pageSize =  PAGINATION.pageSize ;
            var currentPage =  $stateParams.currentPage || PAGINATION.currentPage;
            $scope.searchData = $stateParams ;
            var isChange = false;
            function getInfo(){
                work.get( currentPage ,  pageSize ,  $scope.searchData ).success(function( res ){
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

            $scope.remove = function(){
                if(confirm("是否要删除？"))
                    work.remove( this.item.id ).success(function( res ){
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
