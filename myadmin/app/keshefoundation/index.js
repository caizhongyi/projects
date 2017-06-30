/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('app.keshefoundation', [])
    .controller('controller.keshefoundation',function( $scope,$rootScope, $stateParams, $modal ,$log , $state ,$http ){

        $rootScope.searchData = {} ;

        var currentPage =  $stateParams.currentPage || 1;
        var pageSize =  10 ;
        var searchName =  $stateParams.searchName || '';
        var isChange = false;
        function getInfo(){
            $http.get('app/keshefoundation/data.json').success(function( res ){
                $scope.list = res;
                $scope.totalItems = res.length;
                $scope.currentPage  = currentPage;
                $scope.searchData.name = searchName ;
            })
        }

        $scope.$on("ngPaginationFinished", function(){
            $('#table').dataTable({
                "bPaginate": true,
                "bLengthChange": false,
                "bFilter": false,
                "bSort": true,
                "bInfo": true,
                "bAutoWidth": false
            });
        })

        $scope.searchChange = function(){
            isChange = true ;
        }

        function go (){
            if( isChange )  $scope.currentPage = 0 ;
            $state.go($state.current.name , { currentPage : $scope.currentPage , searchName : $rootScope.searchData.name });
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

        $scope.open = function ( size , item ) {
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

})
    .directive('removeItem', function ($timeout , roles) {
         return {
         restrict: 'A',
         link: function(scope, element, attr ) {
             element.click(function(){
                 $(this).closest('tr').remove();
                 roles.remove( scope.item.id ).success(function( res ){
                     if( res.code == 0)
                     {}
                     else
                         alert('删除失败！')
                 }).error(function(){
                     alert('删除失败！');
                 })
             })
         }
     }})
    .directive('onFinishRenderFilters', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function() {
                        scope.$emit('ngPaginationFinished');
                    });
                }
            }
        }})
    .controller('controller.modal.instance', function ($scope, $rootScope ,$modalInstance ,item , roles , $state) {
        $scope.item = item;
        $scope.ok = function () {
           // $modalInstance.close($scope.selected.item);
            if( item )
                roles.update(  $scope.item ).success(function( res ){
                    if( res.code == 0 ){
                        $modalInstance.dismiss('cancel');
                      //  $state.go($state.current.name , { currentPage :  $rootScope.rootCurrentPage , searchName :  $rootScope.searchData.name });
                    }
                    else{
                        alert('修改失败！');
                    }
                }).error(function(){
                    alert('修改失败！');
                })
            else
                roles.add( $scope.item ).success(function( res ){
                    if( res.code == 0 ){
                        $modalInstance.dismiss('cancel');
                        $state.go($state.current.name , { currentPage : 0 , searchName : '' });
                    }
                    else{
                        alert('添加失败！');
                    }
                }).error(function(){
                    alert('添加失败！');
                })
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
});