/**
 * Created by Administrator on 2015/7/29.
 */
angular.module('settlement.apply.applyFee.cartootherapply', ["settlement.apply.applyFee.service"])
    .controller('controller.settlement.apply.applyFee.cartootherapply',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state", "applyFee", "$filter", "$cookieStore","$timeout", "fileupload", "utils",
        function ($scope, $rootScope, $stateParams, $modal, $state, applyFee,  $filter, $cookieStore , $timeout ,fileupload , utils ) {


            applyFee.get( $stateParams ).success(function( res ){
                if (res.code == 0) {
                    $scope.item = res.data;
                    applyFee.getDeptAccountByDeptId({ dept_id : $scope.item.dept_id }).success(function( res ){
                        if (res.code == 0) {
                            if( !res.data.is_bind ){
                                applyFee.getPaBindByDeptId({ dept_id : $scope.item.dept_id }).success(function( res ) {
                                    if (res.code == 0) {
                                        if (!res.data.is_pa_bind && res.data.be == 1 ) {
                                        $modal.open({
                                            templateUrl: "tpl-bank-card-auth.html",
                                            resolve: {
                                                item: function () {
                                                    return res.data;
                                                }
                                            },
                                            backdrop: 'static',
                                            size: 'md',
                                            controller: ["$scope", "$rootScope", "$modalInstance", "item", "$state", "$location", "applyFee", "utils", function ($scope, $rootScope, $modalInstance, item, $state, $location, applyFee, utils) {

                                                $scope.sendCode = applyFee.sendCode;
                                                $scope.submitted1 = false;
                                                $scope.interactedModal = function (field) {
                                                    return (field.$dirty && $scope.submitted1) || field.isblur;
                                                }
                                                $scope.item = item;
                                                $scope.cardFormSubmit = function (isValid) {
                                                    if (isValid && !$scope.submitted) {
                                                        $scope.submitted1 = true;
                                                        var data = {
                                                            phone_no: $scope.item.linkman_phone,
                                                            code: $scope.item.code,
                                                            id: $scope.item.id
                                                        }
                                                        applyFee.bindBankCard(data).success(function (res) {
                                                            $scope.submitted1 = false;
                                                            if (res.code == 0) {
                                                                utils.message(res.msg || '绑定成功！');
                                                                $modalInstance.dismiss('cancel');
                                                            }
                                                            else {
                                                                utils.message(res.msg || '绑定失败！');
                                                            }
                                                        })
                                                    }
                                                }

                                                /* $scope.ok = function(){
                                                 if( !$scope.item.linkman_phone ){
                                                 utils.message("手机号码不能为空！");
                                                 return ;
                                                 }
                                                 if( !$scope.item.code ){
                                                 utils.message("验证码不能为空！");
                                                 return ;
                                                 }
                                                 var data = {
                                                 phone_no : $scope.item.linkman_phone,
                                                 code : $scope.item.code,
                                                 id : $scope.item.id
                                                 }
                                                 applyFee.bindBankCard( data ).success(function( res ){
                                                 if( res.code == 0 ){
                                                 $scope.submitted1 = false;
                                                 $modalInstance.dismiss('cancel');
                                                 }
                                                 else{
                                                 utils.message( res.msg || '提交失败！');
                                                 }
                                                 })
                                                 }*/

                                                $scope.cancel = function () {
                                                    $modalInstance.dismiss('cancel');
                                                }
                                            }]
                                        });
                                    }
                                    }
                                    //else {
                                        //utils.message(res.msg);
                                    //}
                                })
                            }
                        }
                        else {
                            utils.message(res.msg);
                        }
                    }).error(function () {
                        utils.message('读取失败！');
                    })
                }
                else {
                    utils.message(res.msg);
                }
            }).error(function () {
                utils.message('读取失败！');
            })


            $scope.submitter = {} ;

            $scope.$watch('certificate_pic', function (files) {
                $scope.formUpload = false;
                fileupload.upload(files, function( file, res ){

                });
            });
            $scope.delete = function( files ){
                fileupload.remove( files , this.$index );
            }

            $scope.interacted = function( field ){
                return  (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
            }

            $scope.submitted = false;
            $scope.submit = function( isValid ){
                $scope.submitted = true;
                if( isValid ){
                    $scope.submitter.order_no = $scope.item.order_no;
                    $scope.submitter.file_content = fileupload.objectTofiled($scope.certificate_pic);

                    applyFee.carToOtherApply( $scope.submitter ).success(function ( res ) {
                        $timeout(function(){
                            $scope.submitted = false;
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
                }
            }
        }])
