/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('contract.contract.addContract', [
    'contract.contract.addContract.service',
    'utils.service'
])
    .controller('controller.contract.contract.addContract',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "addContract" ,"utils", 'fileupload', "$filter", "$timeout",
        function ($scope, $rootScope, $stateParams, $modal, $state,  addContract , utils  , fileupload , $filter ,$timeout) {

            $scope.item =  $scope.item || {};

            if($stateParams.car_number){
                $scope.item.car_number = $stateParams.car_number ;
            }
            if($stateParams.order_no){
                $scope.item.order_no = $stateParams.order_no ;
                //获得车况宝信息
                addContract.getInfoByOrderNo( $scope.item.order_no).success( function( res ){
                    if( res && res.code == 0){
                        $scope.item = angular.extend( $scope.item , res.data );
                        $scope.platform_fee = $scope.item.platform_fee || '';
                    } else {
                        utils.message(res.msg);
                    }
                })
            }

            $scope.item.sign_time =  $scope.item.sign_time || $filter('date')(  new Date() ,'yyyy-MM-dd') ;
         /*   $scope.monthOptions = {} ;
            $scope.monthOptions.datepickerMode = 'month';
            $scope.monthOptions.minMode = 'month';*/
     /*       $('[ng-model="item.work_order_no"]').on('change' , function(){
                if( $scope.item.work_order_no )
                    addContract.getInfoByWorkOrderNo( $scope.item.work_order_no).success( function( res ){
                        if( res && res.code == 0){
                            $scope.item = angular.extend( $scope.item , res.data );
                        }
                    })
            })*/
            //最大值
            Array.prototype.max = function() {
                var max = this[0];
                var len = this.length;
                for (var i = 1; i < len; i++){
                    if (this[i] > max) {
                        max = this[i];
                    }
                }
                return max;
            }
            $('[ng-model="item.order_no"]').on('change' , function(){
                if( $scope.item.order_no )
                    addContract.getInfoByOrderNo( $scope.item.order_no).success( function( res ){
                        if( res && res.code == 0){
                            $scope.item = angular.extend( $scope.item , res.data );
                            setTimeout(function() {
                                $scope.item.buyer_tracer_shop = res.data.buyer_tracer_shop;
                                $scope.item.seller_tracer_shop = res.data.seller_tracer_shop;
                                $scope.item.b_platform_fee = res.data.platform_fee.max();
                            }, 500)
                        } else {
                            utils.message(res.msg);
                        }
                    })
            })
            /*$('[ng-model="item.sale_price"]').on('change' , function(){
                if( $scope.item.sale_price ){

                    if( $scope.item.a_brokerage == null){
                        $scope.item.a_brokerage = ($scope.item.sale_price * 0.02 < 1000 ? 1000 : $scope.item.sale_price * 0.02) ;
                        $scope.$apply();
                        $scope.form.a_brokerage.$validate();
                    }
                    if( $scope.item.b_brokerage == null){
                        $scope.item.b_brokerage = ($scope.item.sale_price * 0.02 < 1000 ? 1000 : $scope.item.sale_price * 0.02);
                        $scope.$apply();
                        $scope.form.b_brokerage.$validate();
                    }
                }
            })*/


            $scope.$watch("item.sell_gathering_account_type"  ,function( val ) {
                if( val == 1 ){
                    $scope.item.gathering_account_username = $scope.item.seller_name;
                    $scope.item.gathering_account_card_no  = $scope.item.seller_cert_no;
                    $scope.item.gathering_account_phone = $scope.item.seller_phone;
                }
                else{
                    $scope.item.gathering_account_username  = $scope.item.seller_agent_name;
                    $scope.item.gathering_account_card_no  = $scope.item.seller_agent_cert_no;
                    $scope.item.gathering_account_phone = $scope.item.seller_agent_phone;
                }
            })
            $scope.$watch('item.seller_name' , function( val ){
                if($scope.item.sell_gathering_account_type == 1) $scope.item.gathering_account_username = val
            })
            $scope.$watch('item.seller_cert_no' , function( val ){
                if($scope.item.sell_gathering_account_type == 1) $scope.item.gathering_account_card_no = val;
            })
            $scope.$watch('item.seller_phone' , function( val ){
                if($scope.item.sell_gathering_account_type == 1) $scope.item.gathering_account_phone= val;
            })
            $scope.$watch('item.seller_agent_name' , function( val ){
                if($scope.item.sell_gathering_account_type == 2) $scope.item.gathering_account_username = val
            })
            $scope.$watch('item.seller_agent_cert_no' , function( val ){
                if($scope.item.sell_gathering_account_type == 2) $scope.item.gathering_account_card_no = val;
            })
            $scope.$watch('item.seller_agent_phone' , function( val ){
                if($scope.item.sell_gathering_account_type == 2) $scope.item.gathering_account_phone= val;
            })


            $scope.$watch('item.buyer_name' , function( val ){
                $scope.item.new_vehicle_owner = val;
            })
            $scope.$watch('item.buyer_cert_no' , function( val ){
                $scope.item.new_vehicle_owner_cert_no = val;
            })

        /*    $('[ng-model="item.delivery_items_keycount"]').on('change' , function(){
                $filter('upDigit',)
            })
*/
            $scope.$watch('item.buyer_cert_type' , function( val ){
                $scope.cert_type = $filter('cartType')(val);
                if( val == 6 ){
                    $scope.buyer_cert_other_require = true;
                }
                else{
                    $scope.buyer_cert_other_require = false;
                }
                $scope.buyer_cert_valid = val == 1 ? true: false ;
                $scope.form.buyer_cert_no && $scope.form.buyer_cert_no.$validate()

            })
            $scope.$watch('item.buyer_cert_other' , function( val ){
                if( $scope.item.buyer_cert_type == 6 )
                 $scope.cert_type = val;
            })
            $scope.$watch('item.seller_cert_type' , function( val ){
                if( val == 6 ){
                    $scope.seller_cert_type_other_require=  true;
                }
                else{
                    $scope.seller_cert_type_other_require= false;
                }
                $scope.seller_cert_valid = val == 1 ? true: false ;
                $scope.form.seller_cert_no &&  $scope.form.seller_cert_no.$validate()

            })
            $scope.$watch('item.buyer_agent_cert' , function( val ){
                if( val == 6 ){
                    $scope.buyer_agent_cert_other_require =  true;
                }
                else{
                    $scope.buyer_agent_cert_other_require = false;
                }
                $scope.buyer_agent_cert_valid = val == 1 ? true: false ;
                $scope.form.buyer_agent_cert_no && $scope.form.buyer_agent_cert_no.$validate()
            })
            $scope.$watch('item.seller_agent_cert' , function( val ){
                if( val == 6 ){
                    $scope.seller_agent_cert_other_require =  true;
                }
                else{
                    $scope.seller_agent_cert_other_require =  false;
                }
                $scope.seller_agent_cert_valid = val == 1 ? true: false ;
                $scope.form.seller_agent_cert_no && $scope.form.seller_agent_cert_no.$validate()
            })
           /* $scope.$watch('item.seller_phone' , function( val ){
                if(  $scope.item.seller_phone ){
                    addContract.getRoleByPhoneNo( $.trim(val) ).success(function( res ){
                        if( res.code == 0 ){
                            var data = res.data ;
                            $scope.seller_phone_role = data.role_name;
                        }
                    })
                }
            })*/
/*
            $scope.$watch('item.buyer_phone' , function(val){
                if(  $scope.item.buyer_phone ){
                    addContract.getRoleByPhoneNo( $.trim(val) ).success(function( res ){
                        if( res.code == 0 ){
                            var data = res.data ;
                            $scope.buyer_phone_role  = data.role_name;
                        }
                    })
                }
            })*/

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

            $scope.$watch('item.w_road_bridge', function( val ){
                $scope.road_bridge_time_disabled = val ;$scope.road_bridge_time_required = !val ;
                if( val  ) $scope.item.road_bridge_time = ''
            })
            $scope.$watch('item.w_safe_business', function( val ){
                $scope.safe_business_time_disabled = val ;
                $scope.safe_business_time_required= !val ;
                if( val ) $scope.item.safe_business_time = ''
            })
            $scope.$watch('item.w_safe_force', function( val ){
                $scope.safe_force_time_disabled = val ; ;$scope.safe_force_time_required = !val ;
                if( val  ) $scope.item.safe_force_time = ''
            })
            $scope.$watch('mortgage_set_1', function( val ){
                if( val ) {
                    $scope.mortgage_set_1_required = true;
                    $scope.mortgage_set_2 = false ;
                    $scope.mortgage_set_1_disabled = false ;
                    $scope.item.mortgage_set = 1 ;
                } else {
                    $scope.mortgage_set_1 = $scope.mortgage_set_1_required = false ;
                    $scope.mortgage_set_1_disabled = true ;
                    $scope.item.mortgage_set = null ;
                    $scope.item.mortgage_brokerage = $scope.item.mortgage_compensation = '';
                }
            })
            $scope.$watch('mortgage_set_2', function( val ){
                if( val ) {
                    $scope.mortgage_set_1 = $scope.mortgage_set_1_required = false ;
                    $scope.mortgage_set_1_disabled = true ;
                    $scope.item.mortgage_set = 2 ;
                    $scope.item.mortgage_brokerage = $scope.item.mortgage_compensation = '';
                }
                else{
                }
            } )

            $scope.$watch('item.car_fee_balance_type', function( val ){
                if( val == 1) {
                    $scope.service_items_2 = $scope.new_vehicle_owner_readonly = true;
                }
                else{
                    $scope.service_items_2 = $scope.new_vehicle_owner_readonly = false;
                }
            } )


            var checkboxs = {
                set :function( name , arr ){
                    arr= arr || [];
                    for( var i = 0 ; i < arr.length ; i ++ ){
                        $scope[ name + '_' + ( arr[i] ) ] = true;
                    }
                },
                get :function( name , length ){
                    var arr = [] ;
                    for( var i = 0 ; i < length ; i ++ ){
                        if( $scope[ name + '_' + (i + 1) ] ){
                            arr.push( i );
                        }
                    }
                    return arr;
                }
            }



            if( $stateParams.id ){
                $scope.item.id = $stateParams.id;
                addContract.get( $stateParams.id ).success(function( res ){
                    if (res.code == 0) {

                        if(  res.data.delivery_time && typeof   res.data.delivery_time == 'string'){
                            var dateArr =  res.data.delivery_time.split(' '),
                                date = dateArr[0].split('-'), time = dateArr[1].split(':');
                            var myDate = new Date( date[0] , date[1] - 1, date[2] , time[0], time[1]);
                            res.data.delivery_stime = myDate;
                            res.data.delivery_time =  myDate;
                            $scope.delivery_stime = myDate

                        }
                        $scope.item = res.data;
                        $scope.platform_fee = $scope.item.platform_fee || '';
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


                        checkboxs.set( 'a_safekeeping_cert_c1' , $scope.item.a_safekeeping_cert_c1.split(',')  )
                        checkboxs.set( 'delivery_items' , $scope.item.delivery_items.split(',')  )
                        checkboxs.set( 'service_items' , $scope.item.service_items.split(',') )

                        $scope['mortgage_set_'+  $scope.item.mortgage_set ] = true;

                        if( $scope.item.road_bridge_time == 1 ){
                            $scope.item.w_road_bridge = true;
                            $scope.item.road_bridge_time = '' ;
                        }
                        if( $scope.item.safe_business_time == 1 ){
                            $scope.item.w_safe_business = true;
                            $scope.item.safe_business_time = '' ;
                        }
                        if( $scope.item.safe_force_time == 1 ){
                            $scope.item.w_safe_force = true;
                            $scope.item.safe_force_time = '' ;
                        }

                        setDefault();
                    }
                    else {
                        utils.message(res.msg);
                        $state.go('contract-contract-contractList')
                    }
                }).error(function () {
                    utils.message('读取失败！');
                })
            }
            else{
                setDefault();
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

            $scope.back = function(){
                $state.go('contract-contract-contractList')
            }

            $scope.submitted = false;
            $scope.interacted = function( field ){
                return (utils.browser().msie ? (field.$dirty && $scope.submitted) : (field.$dirty || $scope.submitted)) || field.isblur;
            }

            function setDefault(){
                $scope.item.b_car_fee_time_c2 = $scope.item.b_car_fee_time_c2 || new Date();
                $scope.item.change_start_time =  $scope.item.change_start_time  || new Date();
                $scope.item.delivery_time =  $scope.item.delivery_time  || new Date();
                $scope.delivery_stime =  $scope.delivery_stime  || new Date();
                $scope.item.change_end_time =  $scope.item.change_end_time  || $filter('date')( new Date().setDate(new Date().getDate() + 15)  , 'yyyy-MM-dd');
                $scope.item.b_c1_working_days =  $scope.item.b_c1_working_days || 2;
                $scope.item.a_anency_fee =  $scope.item.a_anency_fee || 0 ;
                $scope.item.b_anency_fee =  $scope.item.b_anency_fee || 0 ;
                $scope.item.a_other_fee =  $scope.item.a_other_fee || 0 ;
                $scope.item.b_other_fee =  $scope.item.b_other_fee || 0 ;
                $scope.item.sell_gathering_account_type =  $scope.item.sell_gathering_account_type || 1;
                $scope.item.gearbox = $scope.item.gearbox || 1;
                $scope.item.use_type = $scope.item.use_type || 1;
                $scope.item.car_fee_balance_type = $scope.item.car_fee_balance_type || 2;
                $scope.item.b_car_fee_type = $scope.item.b_car_fee_type || 1;
                $scope.item.b_anency_mortgage_fee = $scope.item.b_anency_mortgage_fee || 0;

                function checkboxDefault( o ){
                    return  o == null ? true :  o;
                }

                $scope.delivery_items_1 =  checkboxDefault($scope.delivery_items_1) ;
                $scope.delivery_items_2 =  checkboxDefault($scope.delivery_items_2) ;
                $scope.delivery_items_3 =  checkboxDefault($scope.delivery_items_3) ;
                $scope.delivery_items_4 =  checkboxDefault($scope.delivery_items_4) ;

                $scope.service_items_1 =  checkboxDefault($scope.service_items_1) ;
                $scope.service_items_2 =  checkboxDefault($scope.service_items_2) ;
                $scope.service_items_3 =  checkboxDefault($scope.service_items_3) ;
                $scope.service_items_4 =  checkboxDefault($scope.service_items_4) ;

                addContract.getUserInfo().success(function( res ){
                    if( res && res.code == 0 ){
                        $scope.operator = res.data.real_name;
                        $scope.dept_name = res.data.dept_name;

                        if ($scope.item.order_no) {
                            addContract.getOrderInfo($scope.item.order_no).success(function(orderRes) {
                                if( orderRes && orderRes.code == 0 ){
                                    $scope.item.b_platform_fee = orderRes.data.platform_fee ? orderRes.data.platform_fee.max() : null;
                                    $scope.platform_fee = orderRes.data.platform_fee;
                                    //console.log($scope.platform_fee);
                                    $scope.item.seller_tracer_province  =   $scope.item.seller_tracer_province ||  orderRes.data.province;
                                    $scope.item.buyer_tracer_province  =   $scope.item.buyer_tracer_province ||  orderRes.data.province;
                                    $scope.item.seller_tracer_city  =   $scope.item.seller_tracer_city ||  orderRes.data.city;
                                    $scope.item.buyer_tracer_city  =   $scope.item.buyer_tracer_city ||  orderRes.data.city;
                                    $scope.item.seller_tracer_shop  =   $scope.item.seller_tracer_shop ||  orderRes.data.dept_id;
                                    $scope.item.buyer_tracer_shop  =   $scope.item.buyer_tracer_shop || orderRes.data.dept_id;
                                }
                            })
                        }
                        if($scope.item.b_platform_fee == null){
                            $scope.item.b_platform_fee = res.data.platform_fee.max();
                        }
                        $scope.platform_fee = res.data.platform_fee;
                        $timeout(function(){
                            $scope.item.seller_tracer_province  =   $scope.item.seller_tracer_province ||  res.data.province;
                            $scope.item.buyer_tracer_province  =   $scope.item.buyer_tracer_province ||  res.data.province;
                            $scope.item.seller_tracer_city  =   $scope.item.seller_tracer_city ||  res.data.city;
                            $scope.item.buyer_tracer_city  =   $scope.item.buyer_tracer_city ||  res.data.city;
                            $scope.item.seller_tracer_shop  =   $scope.item.seller_tracer_shop ||  res.data.dept_id;
                            $scope.item.buyer_tracer_shop  =   $scope.item.buyer_tracer_shop || res.data.dept_id;
                        },100)
                    }
                })
            }


            $scope.seller_tracer_change = function(){
                for( var i = 0 ; i < this.itemseller_tracerArray.length; i++ ){
                    var o = this.itemseller_tracerArray[i];
                    if( o.id == $scope.item.seller_tracer ){
                        $scope.item.seller_tracer_username = o.username;
                        continue;
                    }
                }
            }
            $scope.buyer_tracer_change = function(){
                for( var i = 0 ; i < this.itembuyer_tracerArray.length; i++ ){
                    var o = this.itembuyer_tracerArray[i];
                    if( o.id == $scope.item.buyer_tracer ){
                        $scope.item.buyer_tracer_username = o.username;
                        continue;
                    }
                }
            }
         /*   $scope.$watch('item.seller_tracer', function( val ){
                console.log(val)
            })*/

            function getData( data ){
                if($scope.bugAgent ===  false){
                    $scope.item.buyer_agent_name = '';
                    $scope.item.buyer_agent_phone = '';
                    $scope.item.buyer_agent_cert_type = '';
                    $scope.item.buyer_agent_cert_no = '';
                }
                if($scope.saleAgent === false){
                    $scope.item.seller_agent_name = '';
                    $scope.item.seller_agent_phone = '';
                    $scope.item.seller_agent_cert_type = '';
                    $scope.item.seller_agent_cert_no = '';
                }
                $scope.item.bugAgent = $scope.bugAgent;
                $scope.item.saleAgent = $scope.saleAgent;

                var data = angular.extend({} , {},  data ) ;

                data.a_safekeeping_cert_c1 = []
                for( var i = 1 ; i<= 3 ; i ++){
                    if( $scope['a_safekeeping_cert_c1_' + i ] ){
                        data.a_safekeeping_cert_c1.push( i )
                    }
                }
                data.a_safekeeping_cert_c1 =  data.a_safekeeping_cert_c1.join(',');

                data.delivery_items = []
                for( var i = 1 ; i<= 8 ; i ++){
                    if( $scope['delivery_items_' + i ] ){
                        data.delivery_items.push( i )
                    }
                }

                data.delivery_items =  data.delivery_items.join(',');

                data.service_items = []
                for( var i = 1 ; i<= 5 ; i ++){
                    if( $scope['service_items_' + i ] ){
                        data.service_items.push( i )
                    }
                }
                data.service_items =  data.service_items.join(',');
                data.delivery_time =  $scope.item.delivery_time + ' ' +  $filter('date')( $scope.delivery_stime ,'HH:mm'  );

                data.w_road_bridge = data.w_road_bridge == true ? 1 : 0 ;
                data.w_safe_business = data.w_safe_business == true ? 1 : 0 ;
                data.w_safe_force = data.w_safe_force == true ? 1 : 0 ;

                return data ;
            }

            $scope.submit = function(isValid){
                $scope.submitted = true;
                if (!isValid) {
                    //  utils.message("验证失败!");
                }
                else{

             /*       for(var i = 0 ; i < $scope.carType.length ; i++){
                        if( $scope.carType[i].type_id == $scope.item.vehicle_type_id ){
                            $scope.item.vehicle_type = $scope.carType[i].name;
                        }
                    }*/

                    //console.log($scope.bugAgent);

                    var data = getData( $scope.item );

                    if(data.b_car_fee_type == 1){
                        if(data.b_car_fee_c2 > data.sale_price){
                            utils.message("全部车款不能大于车辆成交价!");
                            return;
                        }
                    }else if(data.b_car_fee_type == 2){
                        if((data.b_car_fee_c2 + data.b_remain_car_fee_c2)> data.sale_price){
                            utils.message("部分车款加剩余车款不能大于车辆成交价!");
                            return;
                        }
                    }else{
                        utils.message("车款类型错误!");
                        return;
                    }

                    if(data.buyer_cert_no == data.seller_cert_no){
                        utils.message("卖方买方不能为同一个人!");
                        return;
                    }
                    $scope.platform_fee = $scope.platform_fee || $scope.item.platform_fee;

                    var isPass = false ;
                    for(var i = 0 ; i< $scope.platform_fee.length; i ++ ){
                        if(parseFloat(data.a_platform_fee ||
                                0) + parseFloat(data.b_platform_fee || 0) == $scope.platform_fee[i] ){
                            isPass = true;
                            continue;

                        }
                    }

                    if(!isPass){
                        utils.message("甲乙双方承当的平台服务费总和必须等于"+ $scope.platform_fee.join('或'));
                        return ;
                    }

                    data.status = 2;
                    data.order_no = data.order_no || '';
                    addContract.save( data ).success(function( res ){
                        if (res.code == 0) {
                            utils.message(res.msg || '保存成功！');
                            //   $state.go('settlement-contract-horizontal',{order_no : $stateParams.order_no });
                            $state.go('contract-contract-printShow', { id : $stateParams.id || res.data.id } );
                        }
                        else {
                            utils.message(res.msg);
                        }
                        $scope.submitted = false;
                    }).error(function () {
                        utils.message('读取失败！');
                        $scope.submitted = false;
                    })
                }
            }

            function getDraftData( data ){
                for( var i in $scope.form ){
                    var item = $scope.form[i];
                    if( typeof item == 'object' && item.$viewValue && !item.$modelValue ){
                        data[i] = $scope.form[i].$viewValue
                    }
                }
                return data ;
            }

            $scope.saveDraft = function(){
                var data = getData(getDraftData( $scope.item ));

                data.status = 1;
                $scope.submitted = true;
                addContract.save( data ).success(function( res ){
                    if (res.code == 0) {
                        utils.message(res.msg || '保存成功！');
                        $state.go('contract-contract-contractList')
                    }
                    else {
                        utils.message(res.msg);
                    }
                    $scope.submitted = false;
                }).error(function () {
                    utils.message('读取失败！');
                    $scope.submitted = false;
                })
            }

            $scope.now = function(){
                var now = $filter('date')( new Date() , 'yyyy-MM-dd'  ), time =  new Date();
                $scope.item.delivery_time = now ;
                $scope.delivery_stime = time ;
            }
            $scope.goOrder = function(){
                $state.go('settlement-order-addOrder')
            }

        }])

