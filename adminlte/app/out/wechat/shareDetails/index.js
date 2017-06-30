angular.module('out.wechat.shareDetails', [
    'out.wechat.shareDetails.service'
])
    .controller('controller.out.wechat.shareDetails',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state", "shareCarDetail", "utils",
        function ($scope, $rootScope, $stateParams, $modal, $state, shareCarDetail, utils) {
            $scope.showImage = function (src) {
                $scope.cropZoomImage = src.replace(/_200-200c_/, "_0-0_");
            }
            shareCarDetail.get($stateParams.id).success(function (res) {
                if (res.code == 0) {
                    $scope.payment_amount_sum = 0;
                    $scope.handling_fee_sum = 0;
                    $scope.dept_handling_fee_sum = 0;
                    $scope.fee_sum = 0;
                    $scope.list = res.body;

                }
                else {
                    utils.message(res.msg);
                }
            }).error(function () {
                utils.message('读取失败！');
            })
            $scope.utils = utils;

        }])