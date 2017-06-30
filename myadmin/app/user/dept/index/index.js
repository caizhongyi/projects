/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('app.user.dept.index', ['app.user.dept.index.service' ])
    .controller('controller.user.dept.index',function( $scope,$rootScope, $stateParams, $modal ,$log ,depts , $state ){

        $scope.searchData = {} ;
        var currentPage =  $stateParams.currentPage || 1;
        var pageSize =  10 ;
        var searchName =  $stateParams.searchName || '';
        var isChange = false;
        function getInfo(){
            depts.get( currentPage ,  searchName  , pageSize ).success(function( res ){
                $scope.list = res.data.list;
                $scope.totalItems = res.data.total;
                $scope.currentPage = currentPage;
                $scope.searchData.name = searchName ;
            })
        }

        $scope.searchChange = function(){
            isChange = true ;
        }

        function go (){
            if( isChange )  $scope.currentPage = 0 ;
            $state.go($state.current.name , { currentPage : $scope.currentPage , searchName : $scope.searchData.name });
            isChange = false ;
        }

        $scope.searchInfo = $scope.pageChanged = function(){
            go ();
        };

        getInfo();

        /*  $scope.setPage = function (pageNo) {
         if( pageNo )
         $scope.currentPage = pageNo;
         getInfo();
         };*/

        $scope.edit = function(  ){
            $scope.open( null , this.item );
        }
        $scope.add = function(){
            $scope.open( null , {} );
        }

        $scope.open = function (size , item ) {
            var modalInstance = $modal.open({
                templateUrl: 'acl-access-add.html',
                controller: 'controller.modal.instance',
                size: size,
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });

            //弹出结果
            modalInstance.result.then(function () {
                //   $scope.selected = selectedItem;
            }, function () {

            });
        };

        $scope.remove = function( item ){
            console.log(this.item)
            go();
        }

})
 /*   .directive('onFinishRenderFilters', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function() {
                        scope.$emit('ngPaginationFinished');
                    });
                }
            }
        }})*/
    .controller('controller.modal.instance', function ($scope, $modalInstance ,item , roles , $state) {

        $scope.item = item;
        $scope.ok = function () {
            // $modalInstance.close($scope.selected.item);
            roles.add( $scope.item ).success(function(){
                $modalInstance.dismiss('cancel');
                $state.go($state.current.name , { currentPage : 0 , searchName : '' });
            }).error(function(){
                alert('添加失败');
            })
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });