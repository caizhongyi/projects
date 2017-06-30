/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.trade.edit', ["settlement.trade.edit.service"])
    .controller('controller.settlement.trade.edit',
    [ "$scope", "$rootScope", "$stateParams", "$modal" , "$state" , "area" , "utils" , "edit" , "$filter", "$cookieStore",
        function( $scope,$rootScope, $stateParams, $modal , $state , area , utils , edit , $filter, $cookieStore ){
        var dateFilter = $filter('date'),
            userInfo = $cookieStore.get('user') || {} ;

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.seller = {};

        $scope.certType = ["身份证"];

        $scope.carType = [
            '轿车', '越野车/SUV', '面包车', '商务车/MPV', '货车', '跑车', '皮卡', '客车'
        ];
        $scope.useQuality = [
            '非营运', '营运', '营转非', '租赁车', '特种车', '教练车'
        ];

        $scope.trade = {} ;
        if( $stateParams.id ){
            edit.getById( $stateParams.id  ).success(function( res ){
                var d = res.data.sale_date;
                $scope.trade = res.data ;
                $scope.trade.sale_date_picker =  dateFilter(new Date( d * 1000) , 'yyyy-MM-dd') ;
                $scope.trade.seller_cert_type = $scope.trade.buyer_cert_type = "身份证"
            })
        } else {
            edit.get( null , userInfo.id  ).success(function( res ){
                if(res.code == 1){
                    utils.message( res.msg );
                    $state.go('settlement-trade-index')
                } else {
                    $scope.trade = res.data ;
                    $scope.trade.seller_cert_type = $scope.trade.buyer_cert_type = "身份证"
                }
            })
        }

        area.province().success(function( res ) {
            if( res.code == 0 ){
                $scope.seller.province = res.data ;
                $scope.buyer.province = $scope.seller.province;
            }
            else{
                utils.message( res.msg );
            }
        }).error(function(){
            //utils.message("无法访问！");
        })

        $scope.seller.city = [] ;
        $scope.seller.shop = [] ;

        $scope.buyer = {};

        angular.copy(  $scope.buyer.shop , $scope.seller.shop);

        $scope.changeProvince = function( type ){
            area.city( $scope.trade[type+'_tracer_province'].id ).success(function( res ) {
                if( res.code == 0 ){
                    $scope[type].city  = res.data ;
                  //  $scope[type].city = $scope[type].city;
                }
                else{
                    utils.message( res.msg );
                }
            }).error(function(){
                //utils.message("无法访问！");
            })
        }
        $scope.changeCity = function( type ){
            $scope[type].shop = []
        }

        $scope.submitted = false;
        $scope.interacted = function( field ){
            return  field.$dirty || $scope.submitted || field.isblur;
        }

        function serializeTrade(){
            $scope.trade.sale_date = dateFilter(  $scope.trade.sale_date_picker , 'yyyy-MM-dd');
            $scope.trade.entry_user_id = userInfo.id;
        }

        $scope.$watch( 'trade.sale_date_picker'  , function(val){
            $scope.trade.sale_date = dateFilter(  $scope.trade.sale_date_picker , 'yyyy-MM-dd');
        })

        $scope.submit = function(isValid) {
            $scope.submitted = true;
            if (!isValid) {
                utils.message("验证失败!");
            }
            else{
                serializeTrade();
                edit.update( $scope.trade ).success(function( res ) {
                    if( res.code == 0 ){
                        $state.go($state.current, { id : ''}, {reload: true});
                    }
                    else{
                        utils.message( res.msg );
                    }
                }).error(function(){
                    utils.message("无法访问！");
                })
            }
        };

        $scope.save = function(){
           serializeTrade();
            edit.draft( $scope.trade ).success(function( res ) {
                if( res.code == 0 ){
                    utils.message("保存成功！");
                }
                else{
                    utils.message( res.msg );
                }
            }).error(function(){
                utils.message("无法访问！");
            })
        }
}])
