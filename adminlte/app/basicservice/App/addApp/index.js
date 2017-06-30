angular.module('basicservice.App.addApp.config', [ 'basicservice.App.addApp.service'])
    .config(["$provide",function($provide) {
        $provide.value('info', function() {
            return [
                {type:0, name: "4S保养记录"},
                {type:1, name: "保险查询"},
                {type:2, name: "手机归属地"},
                {type:3, name: "身份证查询"},
                {type:4, name: "违章查询"},
                {type:5, name: "车型库"},
                {type:6, name: "IP归属地"},
                {type:7, name: "车价评估"},
            ];
        });
        $provide.value('msger', function() {
            return [
                {type:0, name: "短信推送"},
                {type:1, name: "邮件推送"},
                {type:2, name: "微信推送"},
                {type:3, name: "业管APP推送"},
            ];
        });
        $provide.value('others', function() {
            return [
                {type:0, name: "400转接电话"},
                {type:1, name: "回拨电话"},
                {type:2, name: "全网发车"},
            ];
        });
        $provide.value('channel', function() {
            return [
                {type:'GuoduSms', name: "国度"},
                {type:'WeilaiSms', name: "未来无线"},
                {type:'GuoduMassSms', name: "国度群发"},
            ];
        });
        $provide.value('users', function() {
            return [
                {type:0, name: "WAP站"},
                {type:1, name: "app"},
                {type:2, name: "外包"},
                {type:3, name: "其他"},
            ];
        });
    }]);
angular.module('basicservice.App.addApp', [ 'basicservice.App.addApp.service','basicservice.App.addApp.filter','basicservice.App.addApp.config'])
    .controller('controller.basicservice.App.addApp',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"addApp" , "$state" , "utils"  ,"PAGINATION","$cookieStore" ,"info","msger","others","channel","users",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,addApp , $state , utils  ,PAGINATION, $cookieStore,info,msger,others,channel,users){
            $scope.infoList    = info();
            $scope.msgList     = msger();
            $scope.usersList   = users();
            $scope.channelList = channel();
            $scope.othersList  = others();
            $scope.item        = $scope.item || {} ;
            $('#addApp').on('click','.btn-type',function(){
                $scope.item.app_name = $(this).text();
                if($scope.item.app_name == '回拨电话' || $scope.item.app_name == '短信推送') {
                	//获取扩展
                	if($scope.item.app_name == '短信推送') {
                		$scope.item.app_name = '短信查询';
                	}
                	addApp.getExtend($scope.item.app_name).success(function( res ){
                		$scope.extend = res.data;
                		$('#extend_show').css('display', '');
                		$scope.exsit = '1';
                	})
                } else {
                	$('#extend_show').css('display', 'none');
                	$scope.exsit = '0';
                }
                $scope.$apply();
                
                var workname = $scope.item.app_name;
                //获取workname 名对应的base_app 表的 app字段的数据
                addApp.get(workname).success(function( res ){
                    $scope.list = res.data.list;
                    if($scope.list[0] != '' && $scope.list[0] != undefined) {
                    	var data              = $scope.list[0];
                    	$scope.item.id        = data.id;
                    	$scope.item.append_id = data.append_id;
                    	$scope.item.signup    = data.signup;
                    	$scope.item.module    = data.app_code;
                    }
                    $(window).resize();
                 })
            })
            $scope.ok = function(){
                
                var append_id = $('#append_id').val();//扩展号
                var signup    = $('#signup').val();//签名
                var channel   = $('#channel').val();//SP通道
                var checked   = $('#is_url').prop('checked');//是否启用URL
                var url       = $('#url').val();//回调地址URL
                var module    = $('#module_id').val();//应用类型
              
                var item       = [];
                item.app_name  = $scope.item.app_name;
                item.users     = $scope.item.users;
                
                item.append_id  = append_id;
                
                if(append_id != undefined && append_id != '') {
                	if(append_id.length != 3) {
                		angular.message( '扩展号必须是3位数' );
                		return false;
                	}
                }
                
                item.signup     = signup;
                item.channel    = channel;
                item.checked    = checked;
                item.url        = url;
                item.account_id = '1';//暂时固定填1
                item.module     = module;
                //console.log(item);
                if(item){
                    addApp.add( item ).success(function( res ){
                        if( res.data == '0' ){
                            //$modal.dismiss('cancel');
                            $state.reload();
                        }
                        else{
                            angular.message( '操作成功' );
                        }
                    }).error(function(){
                        angular.message('添加失败！');
                    })
                }
            }
        }])