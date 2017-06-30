angular.module('settlement.contract.addContract', [
    'settlement.contract.addContract.service'
])
    .controller('controller.settlement.contract.addContract',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "contractEdit" , "fileupload","$timeout","utils", "$cookieStore",
        function ($scope, $rootScope, $stateParams, $modal, $state,  contractEdit ,fileupload , $timeout, utils, $cookieStore) {
            $scope.item =  $scope.item || {};
            $scope.userInfo = $cookieStore.get("user");

            $scope.vehicleList = [];
            $scope.item.hasVehicheModeList = false;
            $scope.$watch("item.payee_type",function(){
                if( $scope.item.payee_type == 1){
                    if($scope.item.seller_name) $scope.item.payee_realname = $scope.item.seller_name;
                    if($scope.item.seller_phone) $scope.item.payee_mobile = $scope.item.seller_phone;
                    if($scope.item.seller_cert_no) $scope.item.payee_idcard = $scope.item.seller_cert_no;
                }
                else{
                    if($scope.item.seller_agent_name) $scope.item.payee_realname = $scope.item.seller_agent_name;
                    if($scope.item.seller_agent_phone) $scope.item.payee_mobile = $scope.item.seller_agent_phone;
                    if($scope.item.seller_agent_cert_no) $scope.item.payee_idcard = $scope.item.seller_agent_cert_no  ;
                }
            })

            $scope.$watch(function(){
                if( $scope.item.payee_type == 1){
                    $scope.item.payee_realname = $scope.item.seller_name;
                }
                else{
                   $scope.item.payee_realname = $scope.item.seller_agent_name;
                }
            })



            $scope.$watch('item.seller_phone' , function( val ){
                if(  $scope.item.seller_phone ){
                    contractEdit.getRoleByPhoneNo( $.trim(val) ).success(function( res ){
                        if( res.code == 0 ){
                            var data = res.data ;
                            $scope.seller_phone_role = data.role_name;
                        }
                    })
                }
            })

            $scope.$watch('item.buyer_phone' , function(val){
                if(  $scope.item.buyer_phone ){
                    contractEdit.getRoleByPhoneNo( $.trim(val) ).success(function( res ){
                        if( res.code == 0 ){
                            var data = res.data ;
                            $scope.buyer_phone_role  = data.role_name;
                        }
                    })
                }
            })


            $scope.$watch("bugAgent",function(){
                if( $scope.bugAgent == false){
                    $scope.item.buyer_agent_name = '';
                    $scope.item.buyer_agent_phone = '';
                    $scope.item.buyer_agent_cert_type = 1;
                    $scope.item.buyer_agent_cert_no = '';
                }
            })



            $scope.$watch("saleAgent",function(){
                if( $scope.saleAgent == false){
                    $scope.item.seller_agent_name = '';
                    $scope.item.seller_agent_phone = '';
                    $scope.item.seller_agent_cert_type = 1;
                    $scope.item.seller_agent_cert_no = '';
                }
            })

            $scope.vehicileChange = function(){
                $scope.item.vehicle_model_id = '';
                $scope.item.guide_price  = '';
                if( $scope.item.vehicle_model_id){
                    contractEdit.getModelInfo( $scope.item.vehicle_model_id ).success(function( res ){
                        if( res.code == 0 ){
                            var data = res.data ;
                            if(data.guide_price && data.guide_price != '0') {
                                $scope.item.guide_price = data.guide_price.split('万')[0];
                                $scope.item.buy_tax = ($scope.item.guide_price / 11.7).toFixed(2);
                            }
                        }
                    })
                }
            }

            $scope.$watch("item.vehicle_model",function(val){
                $scope.item.guide_price  = '';
                if( $scope.item.vehicle_model_id){
                    contractEdit.getModelInfo( $scope.item.vehicle_model_id ).success(function( res ){
                        if( res.code == 0 ){
                            var data = res.data ;
                            if(data.guide_price && data.guide_price != '0') {
                                $scope.item.guide_price = data.guide_price.split('万')[0];
                                $scope.item.buy_tax = ($scope.item.guide_price / 11.7).toFixed(2);
                            }
                        }
                    })
                }
            })

            var setDefault = function(){
                $scope.item =  $scope.item || {} ;
                //$scope.item.platform_fee =   $scope.item.platform_fee || 500 ;
                $scope.item.hasVehicheModeList = $scope.item.hasVehicheModeList == null ? true : $scope.item.hasVehicheModeList;
                $scope.item.platform_fee =   $scope.item.platform_fee || 0 ;
                $scope.item.dept_payment =  ($scope.item.brokerage -  $scope.item.platform_fee) ;
                $scope.item.dept_payment = $scope.item.dept_payment < 0 ? 0 :  $scope.item.dept_payment;

            }
            setDefault();

            function resetInfoByZqOrderNoData ( data ){
                data.car_number = $scope.item.car_number;
                data.order_no = $scope.item.order_no;
                data.dept_payment = $scope.item.dept_payment;
                data.platform_fee = $scope.item.platform_fee;
                data.payee_type = $scope.item.payee_type;
                data.is_from_contract = $scope.item.is_from_contract == null ? true : false ;
                data.fee = $scope.item.fee ;
                data.contract_pic = $scope.item.contract_pic;
                data.contract_picArray = $scope.item.contract_picArray;
            //    data.certificate_pic = $scope.item.certificate_pic || data.certificate_pic;
              //  data.certificate_picArray = $scope.item.certificate_picArray || data.certificate_picArray;
                return data;
            }

            contractEdit.get( $stateParams.order_no ).success(function( res ){
                if (res.code == 0) {
                    $scope.item = res.data;
                    $scope.item.hasVehicheModeList = false;
                    if( $scope.item.buyer_agent_name || $scope.item.buyer_agent_phone  || $scope.item.buyer_agent_cert_no){
                        $scope.bugAgent = true;
                    }
                    if( $scope.item.seller_agent_name || $scope.item.seller_agent_phone  || $scope.item.seller_agent_cert_no){
                        $scope.saleAgent = true;
                    }

                    $scope.item.buyer_cert_type = $scope.item.buyer_cert_type || 1;
                    $scope.item.buyer_agent_cert_type = $scope.item.buyer_agent_cert_type || 1;
                    $scope.item.seller_cert_type = $scope.item.seller_cert_type || 1;
                    $scope.item.seller_agent_cert_type = $scope.item.seller_agent_cert_type || 1;

                    $scope.certificate_pic = fileupload.filedToObject( $scope.item.certificate_pic );
                    $scope.contract_pic =  fileupload.filedToObject(  $scope.item.contract_pic ) ;

                    $scope.item.seller_tracer_province  =   $scope.item.seller_tracer_province ||  $scope.item.province;
                    $scope.item.buyer_tracer_province  =   $scope.item.buyer_tracer_province ||  $scope.item.province;
                    $scope.item.seller_tracer_city  =   $scope.item.seller_tracer_city ||  $scope.item.city;
                    $scope.item.buyer_tracer_city  =   $scope.item.buyer_tracer_city ||  $scope.item.city;
                    $scope.item.seller_tracer_shop  =   $scope.item.seller_tracer_shop ||  $scope.item.dept_id;
                    $scope.item.buyer_tracer_shop  =   $scope.item.buyer_tracer_shop ||  $scope.item.dept_id;

                    /*if( !$scope.item.contract_no )
                        contractEdit.getInfoByZqOrderNo( $stateParams.order_no ).success(function( res ){
                        if (res.code == 0) {
                            var data =  res.data;
                            $scope.item = resetInfoByZqOrderNoData ( data );
                            $scope.item.vehicle_brand = data.brand_name;
                            $scope.item.vehicle_brand_id = data.brand_id;
                            $scope.item.vehicle_series = data.series_name;
                            $scope.item.vehicle_series_id = data.series_id;
                            //  $scope.item.vehicle_type_id = data.type_id;
                            $scope.item.frame_number = data.vin;

                            $scope.saleAgent = !!$scope.item.seller_agent_name;
                            $scope.bugAgent = !!$scope.item.buyer_agent_name;
                            $scope.item.payee_realname  = $scope.item.gathering_account_username;
                            $scope.item.payee_cardno = $scope.item.gathering_account;
                            $scope.item.payee_bank = $scope.item.gathering_account_bank;
                            $scope.item.payee_bank_branch = $scope.item.gathering_account_bank_branch;
                            $scope.item.payee_idcard = $scope.item.gathering_account_bank;
                            $scope.item.payee_mobile = $scope.item.gathering_account_phone;
                            $scope.item.fee =  $scope.item.a_brokerage + $scope.item.b_brokerage + $scope.item.a_anency_fee + $scope.item.b_anency_fee + $scope.item.a_other_fee + $scope.item.b_other_fee + $scope.item.sale_price;
                            $scope.item.brokerage = $scope.item.a_brokerage + $scope.item.b_brokerage;
                            $scope.item.anency_fee =  $scope.item.a_anency_fee + $scope.item.b_anency_fee;
                            $scope.item.other_fee =  $scope.item.a_other_fee + $scope.item.b_other_fee;
                            $scope.item.car_fee =  $scope.item.b_remain_car_fee_c2 + $scope.item.b_car_fee_c2;

                        }

                    })
*/

                    setDefault();

                }
                else {
                    utils.message(res.msg);
                }
            }).error(function () {
                utils.message('读取失败！');
            })

            $scope.updateContract = function(){
                contractEdit.getInfoByZqOrderNo( $stateParams.order_no ).success(function( res ){
                    if( res.code == 0 ){

                        var data =  res.data;
                        $scope.item = resetInfoByZqOrderNoData ( data );
                         $scope.item.hasVehicheModeList = false;
                        $scope.item.is_from_contract = true;
                        $scope.item.vehicle_brand = data.brand_name;
                        $scope.item.vehicle_brand_id = data.brand_id;
                        $scope.item.vehicle_series = data.series_name;
                        $scope.item.vehicle_series_id = data.series_id;
                        //  $scope.item.vehicle_type_id = data.type_id;
                        $scope.item.frame_number = data.vin;
                        $scope.saleAgent = !!$scope.item.seller_agent_name;
                        $scope.bugAgent = !!$scope.item.buyer_agent_name;
                        $scope.item.payee_realname  = $scope.item.gathering_account_username;
                        $scope.item.payee_cardno = $scope.item.gathering_account;
                        $scope.item.payee_bank = $scope.item.gathering_account_bank;
                        $scope.item.payee_bank_branch = $scope.item.gathering_account_bank_branch;
                        $scope.item.payee_idcard = $scope.item.gathering_account_bank;
                        $scope.item.payee_mobile = $scope.item.gathering_account_phone;
                        //$scope.item.fee =  $scope.item.a_brokerage + $scope.item.b_brokerage + $scope.item.a_anency_fee + $scope.item.b_anency_fee + $scope.item.a_other_fee + $scope.item.b_other_fee + $scope.item.b_remain_car_fee_c2 + $scope.item.b_car_fee_c2;
                        $scope.item.brokerage = $scope.item.a_brokerage + $scope.item.b_brokerage;
                        $scope.item.anency_fee =  $scope.item.a_anency_fee + $scope.item.b_anency_fee;
                        $scope.item.other_fee =  $scope.item.a_other_fee + $scope.item.b_other_fee;
                        $scope.item.car_fee =  $scope.item.b_remain_car_fee_c2 + $scope.item.b_car_fee_c2;

                        if( $scope.item.buyer_agent_cert_type != 1 ){
                            $scope.item.buyer_agent_cert_type = 2
                        }
                        if( $scope.item.seller_agent_cert_type != 1 ){
                            $scope.item.seller_agent_cert_type = 2
                        }
                        if( $scope.item.buyer_cert_type != 1 ){
                            $scope.item.buyer_cert_type = 2
                        }
                        if( $scope.item.seller_cert_type != 1 ){
                            $scope.item.seller_cert_type = 2
                        }

                      //  if( $scope.item.is_jhc == 0 ) return ;

                        utils.message( res.msg || '获取成功！');

                    }
                    else{
                        $scope.item.is_from_contract = false;
                    }
                }).error(function(res ){
                    utils.message( res.msg || '获取失败！');                })
            }


       /*     $('[ng-model="item.contract_no"]').change(function(){
                if($scope.item.contract_no )
                contractEdit.getInfoByZqContractId( $scope.item.contract_no ).success(function( res ){

                    if( res.code == 0 ){
                        var data =  res.data;
                        $scope.item = resetInfoByZqOrderNoData ( data );
                        $scope.item.vehicle_brand = data.brand_name;
                        $scope.item.vehicle_brand_id = data.brand_id;
                        $scope.item.vehicle_series = data.series_name;
                        $scope.item.vehicle_series_id = data.series_id;
                      //  $scope.item.vehicle_type_id = data.type_id;
                        $scope.item.frame_number = data.vin;

                        $scope.saleAgent = !!$scope.item.seller_agent_name;
                        $scope.bugAgent = !!$scope.item.buyer_agent_name;
                        $scope.item.payee_realname  = $scope.item.gathering_account_username;
                        $scope.item.payee_cardno = $scope.item.gathering_account;
                        $scope.item.payee_bank = $scope.item.gathering_account_bank;
                        $scope.item.payee_bank_branch = $scope.item.gathering_account_bank_branch;
                        $scope.item.payee_idcard = $scope.item.gathering_account_bank;
                        $scope.item.payee_mobile = $scope.item.gathering_account_phone;
                        $scope.item.fee =  $scope.item.a_brokerage + $scope.item.b_brokerage + $scope.item.a_anency_fee + $scope.item.b_anency_fee + $scope.item.a_other_fee + $scope.item.b_other_fee + $scope.item.sale_price;
                        $scope.item.brokerage = $scope.item.a_brokerage + $scope.item.b_brokerage;
                        $scope.item.anency_fee =  $scope.item.a_anency_fee + $scope.item.b_anency_fee;
                        $scope.item.other_fee =  $scope.item.a_other_fee + $scope.item.b_other_fee;
                        $scope.item.car_fee =  $scope.item.b_remain_car_fee_c2 + $scope.item.b_car_fee_c2;

                        if( $scope.item.buyer_agent_cert_type != 1 ){
                            $scope.item.buyer_agent_cert_type = 2
                        }
                        if( $scope.item.seller_agent_cert_type != 1 ){
                            $scope.item.seller_agent_cert_type = 2
                        }
                        if( $scope.item.buyer_cert_type != 1 ){
                            $scope.item.buyer_cert_type = 2
                        }
                        if( $scope.item.seller_cert_type != 1 ){
                            $scope.item.seller_cert_type = 2
                        }

                        if( $scope.item.is_jhc == 0 ) return ;


                    }
                    else{
                        $scope.item.is_from_contract = false;
                         /!*$scope.item = {
                             is_from_contract : false,
                             car_number : $scope.item.car_number,
                             order_no : $scope.item.order_no,
                             contract_no : $scope.item.contract_no,
                             payee_type : $scope.item.payee_type || 1
                         }*!/

                    }
                })
            })*/

            $('[name=information_no]').blur(function(){
                if(  $scope.item.information_no ){
                    contractEdit.getInfo( $scope.item.information_no ).success(function( res ){
                        if( res.code == 0 ){
                            var data = res.data ;
                            if( !res.data ) return ;
                            $scope.item.vehicle_brand = data.brand_name;
                            $scope.item.vehicle_brand_id = data.brand_id;
                            $scope.item.vehicle_series = data.series_name;
                            $scope.item.vehicle_series_id = data.series_id;
                            $scope.item.vehicle_model = data.model_name;
                            $scope.item.vehicle_model_id = data.model_id;
                            $scope.item.vehicle_type_id = data.type_id;
                            $scope.item.frame_number = data.car_vin;
                        }
                    })
                }
            })

            $scope.$watch('certificate_pic', function (files) {
                $scope.formUpload = false;
                fileupload.upload(files, function( file, res ){

                });
            });

            $scope.$watch('contract_pic', function (files) {
                $scope.formUpload = false;
                fileupload.upload(files, function( res ){

                });
            });

            $scope.uploadPic = function (files) {
                $scope.formUpload = true;
                if (files != null) {
                    fileupload.upload(files[0])
                }
            };


            $scope.submitted = false;
            $scope.interacted = function( field ){
                return (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
            }

            $scope.hasPayee = false;


            $scope.$watch("item.car_fee"  ,function( val ) {
                if( $scope.item.car_fee > 0 ){
                    $scope.hasPayee = true;
                }
                else{
                    $scope.hasPayee = false;
                }
            })
            $scope.$watch("item.brokerage"  ,function( val ) {
                if( val && $scope.item.is_jhc == 1 ){
                    $scope.item.dept_payment = val  - $scope.item.platform_fee < 0 ? 0 :  val  - $scope.item.platform_fee;
                }
            })

            $scope.back = function(){
                $state.go('settlement-order-orderList');
            }

            $scope.delete = function( files ){
                fileupload.remove( files , this.$index );
            }

            $scope.showImg = function(url){
                $scope.src = url.replace(/_[0-9]+\-[0-9]+[a-z]_/,'_0-0_');
            }

            $scope.submit = function(isValid){

                /* console.log( $scope.item.car_fee + $scope.item.brokerage + $scope.item.anency_fee + $scope.item.transfer_fee + $scope.item.other_fee);
                 if( $scope.item.fee < $scope.item.car_fee + $scope.item.brokerage + $scope.item.anency_fee + $scope.item.transfer_fee + $scope.item.other_fee ){
                 alert('所填 车款 , 信息服务费 , 代办过户费 ,过户费 , 其它费用 之后应小于等于 订单总金额');
                 return ;
                 }*/
                $scope.submitted = true;
                if (!isValid) {
                    //  utils.message("验证失败!");
                }
                else{
                    if(parseFloat($scope.item.fee) != parseFloat($scope.item.car_fee) + parseFloat($scope.item.brokerage) + parseFloat($scope.item.anency_fee) + parseFloat($scope.item.transfer_fee) + parseFloat($scope.item.other_fee)){
                        utils.message("款项总和不等于订单总金额!");
                        return;
                    }
                    // if(parseFloat($scope.item.fee) > parseFloat($scope.item.sale_price) ){
                    //     utils.message("车辆成交价不能订单总金额!");
                    //     return;
                    // }
                    var data  = angular.extend( {} , $scope.item );
                /*    data.contract_pic = fileupload.objectTofiled($scope.contract_pic);
                    data.certificate_pic = fileupload.objectTofiled($scope.certificate_pic);*/
                    data.contract_pic = data.contract_picArray;
                    data.certificate_pic = data.certificate_picArray;

					for(var i = 0 ; i < $scope.carType.length ; i++){
						if( $scope.carType[i].type_id == data.vehicle_type_id ){
                            data.vehicle_type = $scope.carType[i].name;
						}
					}

                    //console.log($scope.bugAgent);
                    if($scope.bugAgent ===  false){
                        data.buyer_agent_name = '';
                        data.buyer_agent_phone = '';
                        data.buyer_agent_cert_type = '';
                        data.buyer_agent_cert_no = '';
                    }
                    if($scope.saleAgent === false){
                        data.seller_agent_name = '';
                        data.seller_agent_phone = '';
                        data.seller_agent_cert_type = '';
                        data.seller_agent_cert_no = '';
                    }
                    data.bugAgent = $scope.bugAgent;
                    data.saleAgent = $scope.saleAgent;
                    contractEdit.save( data ).success(function( res ){
                        if (res.code == 0) {
                            utils.message(res.msg || '保存成功！');
                         //   $state.go('settlement-contract-horizontal',{order_no : $stateParams.order_no });
                            $state.go('settlement-order-orderList');
                        }
                        else {
                            utils.message(res.msg);
                        }
                    }).error(function () {
                        utils.message('读取失败！');
                    })
                }

            }
            $scope.noticeTransfer = function(){
                var item = this.item;
                $modal.open({
                    templateUrl: "tpl-notice-transfer.html" ,
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    size:  'md',
                    controller:   [  "$scope", "$rootScope", "$modalInstance", "item", "$state", "$filter",function(
                        $scope, $rootScope, $modalInstance, item, $state ,$filter
                    ){
                        $scope.cancel = function(){
                            $modalInstance.dismiss('cancel');
                        }

                        $scope.item = item;
                        $scope.submitter = $scope.submitter || {};
                        $scope.submitter.status = item.car_number;
                        $scope.submitter.order_no = $scope.item.order_no;

                        $scope.submitted = false;
                        $scope.interacted = function( field ){
                            $scope.interacted = function( field ){
                                return  (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
                            }
                        }

                        $scope.ok = function(isValid){

                            $scope.submitted = true;
                            if( isValid ){
                                contractEdit.noticeTransfer( $scope.submitter ).success(function( res ){
                                    if (res.code == 0) {
                                        $modalInstance.dismiss('cancel');
                                        utils.message(res.msg || '发送成功!');
                                    }
                                    else {
                                        utils.message(res.msg);
                                    }
                                }).error(function () {
                                    utils.message('读取失败！');
                                })
                            }
                        }
                    }]
                });
            }


        }])
