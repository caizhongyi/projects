angular.module('out.wechat.saleDetails', [
    'out.wechat.saleDetails.service'
])
    .controller('controller.out.wechat.saleDetails',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state", "saleCarDetail", "utils",
        function ($scope, $rootScope, $stateParams, $modal, $state, saleCarDetail, utils) {
            $scope.showImage = function (src) {
                $scope.cropZoomImage = src.replace(/_200-200c_/, "_0-0_");
            }
            saleCarDetail.get($stateParams.id).success(function (res) {
                if (res.code == 0) {
                    $scope.payment_amount_sum = 0;
                    $scope.handling_fee_sum = 0;
                    $scope.dept_handling_fee_sum = 0;
                    $scope.fee_sum = 0;
                    $scope.item = res.body;
                    var contractPic = $scope.item.contract_pic ? $scope.item.contract_pic : new Array();
                    // console.log($scope.item.orderInfo.order_contract.certificate_pic);
                    var certificatePic = $scope.item.certificate_pic ? $scope.item.certificate_pic : new Array();
                    // console.log($scope.item.applyInfo.file_content);;
                    $scope.item.pics =  contractPic.concat(certificatePic);
                }

                else {
                    utils.message(res.msg);
                }
            }).error(function () {
                utils.message('读取失败！');
            })
            $scope.utils = utils;

        }])