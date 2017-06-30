angular.module('basicservice.Msg.msgList.config', [ 'basicservice.Msg.msgList.service'])
    .config(["$provide",function($provide) {
        $provide.value('smsstatus', function() {
            return [
                {type:100, name: "未发送"},//未发送应该是0，但是会出错，所以用100
                {type:1, name: "发送中"},
                {type:2, name: "发送成功"},
                {type:3, name: "appid未授权"},
                {type:4, name: "黑名单"},
                {type:5, name: "通道失败"},
                {type:6, name: "超时"},
                {type:7, name: "其他原因"},
                {type:9, name: "60秒内重复发送"},

            ];
        });
        $provide.value('msgchannel', function() {
            return [
                {type:'GuoduSms', name: "国度"},
                {type:'VcomcnSms', name: "即时通"},
                {type:'WeilaiSms', name: "未来无线"},
                {type:'GuoduMassSms', name: "国度群发"},

            ];
        });
    }]);
angular.module('basicservice.Msg.msgList', [ 'basicservice.Msg.msgList.service',"basicservice.Msg.msgList.config","basicservice.Msg.msgList.filter"])
    .controller('controller.basicservice.Msg.msgList',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"msg" , "$state" , "utils"  ,"PAGINATION","$cookieStore" , "smsstatus","msgchannel",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,msg , $state , utils  ,PAGINATION, $cookieStore,smsstatus,msgchannel ){
            $scope.searchData      = {} ;
            $scope.maxSize         = PAGINATION.maxSize;
            $scope.searchCondition = $scope.searchCondition || {};
            var pageSize           = 100;
            var currentPage        = $stateParams.currentPage || PAGINATION.currentPage;
            $scope.searchData      = $stateParams;
            $scope.smsstatusList   = smsstatus();
            $scope.msgchannelList  = msgchannel();
            var isChange           = false;
            console.info($scope.searchData);
            function getInfo(){
                msg.get( currentPage ,  pageSize ,  $scope.searchData ).success(function( res ){
                	$scope.list        = res.data.list;
                    $scope.totalItems  = res.data.total;
                    $scope.totalFee    = res.data.totalFee;
                    $scope.currentFee  = res.data.currentFee;
                    if(res.data.showFee == '2') {
                    	$scope.showFee = true;//是否需要显示短信费用总和
                    } else {
                    	$scope.showFee = false;
                    }
                    
                    $scope.currentPage = currentPage;
                    msg.getApp().success(function( res ){
                		$scope.appList = res.data;
                	})
                    $(window).resize();
                })
            }

            $scope.searchChange = function(){
                isChange = true ;
            }

            function flush (){
                if( isChange )  $scope.currentPage = 0 ;
                $scope.searchData.start_date = utils.dateFormat($scope.searchData.start_date)
                $scope.searchData.end_date = utils.dateFormat($scope.searchData.end_date)
                $scope.searchData.currentPage = $scope.currentPage ;
                $scope.searchData.app = $scope.searchData.app ;
                $scope.searchData.radio_date = $scope.searchData.radio_date;
                //console.info($scope.searchData);
                $state.go($state.current.name ,  $scope.searchData ,{ reload : true } );
                isChange = false ;
            }

            $scope.searchInfo = $scope.pageChanged = function(){
                flush ();
            };

            getInfo();

            $scope.dateSelect = function(flag){
                if(flag == '1') {
                	$('input[type="radio"]').prop('checked', false);
                } else {
                	$scope.searchData.start_date = '';
                	$scope.searchData.end_date   = '';
                }
            };
            
           /* $scope.add = function(){
                $state.go('identify-index-edittradedetail');
            }

            $scope.edit = function(){
                $state.go('identify-index-edittradedetail',{ id : this.item.id });
            }

            $scope.draft = function(){
                $state.go('identify-index-edittradedetail',{ id : this.item.id });
            }*/
        }])

