angular.module('settlement.apply.applyFee.brokerageapply', ["settlement.apply.applyFee.service"])
    .controller('controller.settlement.apply.applyFee.brokerageapply',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state", "applyFee", "$filter", "$cookieStore","$timeout","utils",
        function ($scope, $rootScope, $stateParams, $modal, $state, applyFee,  $filter, $cookieStore , $timeout , utils ) {
            $scope.submitter = {};
            $scope.submitted = false;

            applyFee.get( $stateParams ).success(function( res ){
                if (res.code == 0) {
                    $scope.item = res.data;
                    $scope.submitter.province = $scope.item.province;
                    $scope.submitter.city = $scope.item.city;
                    $scope.submitter.to_dept_id = $scope.item.dept_id;
                }
                else {
                    utils.message(res.msg);
                }
            }).error(function () {
                utils.message('读取失败！');
            })


            $scope.interacted = function( field ){
                return  (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
            }

            $scope.$watch('submitter.to_dept_id',function(){
                applyFee.getDeptAccountByDeptId({ dept_id : $scope.submitter.to_dept_id }).success(function( res ){
                    $scope.item  = angular.extend( $scope.item , res.data )
                })
            })

            $scope.submitted = false;
            $scope.submit = function( isValid ){
                $scope.submitted = true;
                if( isValid ){
                    $scope.submitter.order_no = $scope.item.order_no;
                    applyFee.brokerageApply( $scope.submitter ).success(function ( res ) {
                        $scope.submitted = false;
                        $timeout(function(){
                            if (res.code == 0) {
                                utils.message( res.msg || res.message || '保存成功！' ) ;
                                $state.go('settlement-order-orderList');
                            }
                            else {
                                utils.message( res.msg || res.message ) ;
                            }
                        })
                    }).error(function () {
                        $scope.submitted = false;
                        utils.message('添加失败！');
                    })
                } else {
                    $scope.submitted = false;
                }
            }

        }])
