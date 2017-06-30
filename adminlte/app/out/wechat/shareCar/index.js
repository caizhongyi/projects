angular.module('out.wechat.shareCar', [
    'out.wechat.shareCar.service',
    'ui.router'
])
    .controller('controller.out.wechat.shareCar',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$log", "share", "$state", "utils", "modules", "PAGINATION",
        function ($scope, $rootScope, $stateParams, $modal, $log, share, $state, utils, modules, PAGINATION) {
            $scope.searchData = {};
            $scope.maxSize = PAGINATION.maxSize;
            var currentPage = $stateParams.currentPage || PAGINATION.currentPage;
            var pageSize = PAGINATION.pageSize;
            var searchName = $stateParams.searchName || '';
            var isChange = false;
            $scope.searchData = $stateParams;
            function getInfo() {
                share.get(currentPage, pageSize, $scope.searchData).success(function (res) {

                    $scope.list = res.body.list;
                    $scope.totalItems = res.body.total;
                    //$rootScope.rootCurrentPage =
                    $scope.currentPage = currentPage;
                    $scope.searchData.name = searchName;
                    $(window).resize();
                    /* $scope.emit('pageChanged', {
                     currentPage : currentPage,
                     searchData :  $scope.searchData
                     });*/
                })
            }


            $scope.searchChange = function () {
                isChange = true;
            }

            function go() {

                if (isChange)  $scope.currentPage = 0;
                $scope.searchData.currentPage = $scope.currentPage
                $state.go($state.current.name, $scope.searchData, {reload: true});
                isChange = false;
            }

            $scope.searchInfo = $scope.pageChanged = function () {
                go();
            };

            getInfo();

            $scope.edit = function () {
                $scope.open(null, this.item);
            }
            $scope.add = function () {
                $scope.open(null, {});
            }
            $scope.open = function (size, item) {
                var modalInstance = $modal.open({
                    templateUrl: 'tpl-add.html',
                    controller: 'controller.modal.instance',
                    size: size,
                    resolve: {
                        item: function () {
                            return item;
                        },
                        currentPage: function () {
                            return currentPage;
                        }
                    }
                });
            };
            $scope.finish = function () {
                var item = this.item;
                share.del(item).success(function (res) {
                    $modal.open({
                        templateUrl: "tpl-delete.html",
                        resolve: {
                            res: function () {
                                return res;
                            }
                        },
                        size: 'md',
                        controller: ["$scope", "$rootScope", "$modalInstance", "res", "$state", function ($scope, $rootSdelcope, $modalInstance, res, $state) {
                            $scope.res = res;
                            $scope.cancel = function () {
                                $modalInstance.dismiss('cancel');
                                $state.reload();
                            }
                        }]
                    });
                });
            }


            $scope.remove = function () {
                if (confirm("�Ƿ�Ҫɾ��"))
                //var item = this.item ;
                    share.remove(this.item.id).success(function (res) {
                        if (res.token == 0) {
                            /* var elem = utils.findById( $scope.list , item.id );
                             if( elem ){
                             $scope.list.splice( $scope.list.indexOf( elem )  , 1) ;
                             }*/
                            $state.reload();
                        }
                        else {
                            angular.message(data.msg);
                        }
                    }).error(function () {
                        angular.message('ɾ��ʧ�ܣ�');
                    })
            }


        }])
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
    .controller('controller.modal.instance', [
        "$scope", "$rootScope", "$modalInstance", "item", "share", "$state", "currentPage",
        function ($scope, $rootScope, $modalInstance, item, share, $state, currentPage) {
            $scope.item = item;
            //获取Token;
            function _getRandomString(len) {
                len = len || 32;
                var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
                var maxPos = $chars.length;
                var pwd = '';
                for (i = 0; i < len; i++) {
                    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            }

            $scope.getToken = function () {
                $scope.item.token = _getRandomString(10);
            }
            $scope.create = function (isValid) {
                if (isValid) {
                    share.add($scope.item).success(function (res) {

                        console.log(res)
                        alert("提交成功！");
                        $modalInstance.dismiss('cancel');
                    })

                }

            }
            $scope.remove = function () {
                if (confirm("是否要删除？"))
                //var item = this.item ;
                    share.remove(this.item.date).success(function (res) {
                        if (res.code == 0) {
                            /* var elem = utils.findById( $scope.list , item.id );
                             if( elem ){
                             $scope.list.splice( $scope.list.indexOf( elem )  , 1) ;
                             }*/
                            $state.reload();
                        }
                        else {
                            angular.message(data.msg);
                        }
                    }).error(function () {
                        angular.message('删除失败！');
                    })
            }

        }])