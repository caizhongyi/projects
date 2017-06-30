/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('user.dept.index', ['user.dept.index.service', 'user.dept.index.filter', 'utils.service', 'user.dept.index.directive'])
    .controller('controller.user.dept.index',[ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"depts" , "$state", "area" , "utils"  ,function( $scope, $rootScope, $stateParams, $modal ,$log ,depts , $state, area , utils ) {

        $scope.searchData = {};
        var currentPage = $stateParams.currentPage || 1;
        var pageSize = 10;
        var searchName = $stateParams.searchName || '';
        var isChange = false;

        function getInfo() {
            depts.get(currentPage, searchName, pageSize).success(function (res) {
                $scope.list = res.data.list;
                $scope.totalItems = res.data.total;
                $scope.currentPage = currentPage;
            })
        }

        $scope.searchChange = function () {
            isChange = true;
        };

        function go() {
            if (isChange)  $scope.currentPage = 0;
            $state.go($state.current.name, {currentPage: $scope.currentPage});
            isChange = false;
        }

        $scope.searchInfo = $scope.pageChanged = function () {
            go();
        };

        getInfo();

        $scope.edit = function () {
            $scope.open(null, this.item, 'tpl-update.html');
        }

        $scope.add = function () {
            $scope.open(null, {}, 'tpl-add.html');
        }

        $scope.open = function (size, item, template) {
            var modalInstance = $modal.open({
                templateUrl: template,
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
            }, function () {

            });
        };
    }])
    .directive('removeItem', [ "$timeout", "depts" , "utils" ,function($timeout, depts ,utils ) {
        return {
            restrict : 'A',
            link : function(scope, element, attr) {
                element.click(function() {
                    if (confirm("确定删除？")) {
                        depts.remove( scope.item.id ).success(function( res ){
                            if( res.code == 0){
                                element.closest('tr').remove();
                            }
                            else{
                                utils.message( res.msg );
                            }
                        }).error(function(){
                            utils.message('删除失败！');
                        })
                    }
                })
            }
        }
    }])

    .controller('controller.modal.instance',["$scope", "$modalInstance" ,"item" , "depts" , "$state" , "utils", function ($scope, $modalInstance ,item , depts , $state , utils ) {
        $scope.item = item;
        $scope.add = function (isValid) {

            if (isValid) {
                depts.add( $scope.item ).success(function( res ){
                    if( res.code == 0 ){
                        $modalInstance.dismiss('cancel');
                        $state.go($state.current.name , { currentPage : 0});
                    }
                    else{
                        utils.message( res.msg );
                    }
                });
            }
        };


        $scope.update = function (isValid) {
            if (isValid) {
                depts.update(  $scope.item ).success(function( res ){
                    if( res.code == 0 ){
                        $modalInstance.dismiss('cancel');
                    }
                    else {
                        utils.message( res.msg );
                    }
                }).error(function(){
                    utils.message('请求失败!');
                })
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]);