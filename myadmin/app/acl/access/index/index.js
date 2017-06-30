/**
 * Created by DTO on 2015/4/27.
 */
var appUser = angular.module('app.acl-access-index', []);
appUser.controller('controller.acl.access.index',function($scope, $modal ,$log){
    $scope.acl = [
        {
            id : 1,
            role : '权限测试',
            user : 21,
            desc : 'xx',
            right : 1
        },
        {
            id : 2,
            role : '权限测试',
            user : 21,
            desc : 'xx',
            right : 1
        }
    ]

    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;


    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'acl-access-add.html',
            controller: 'controller.modal.instance',
            size: size,
            resolve: {
               /* items: function () {
                    return $scope.items;
                }*/
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {

        });
    };

    $scope.remove = function(){
        console.log(arguments);
    }

}).controller('controller.modal.instance', function ($scope, $modalInstance) {

 /*   $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };*/

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});