angular.module('basicservice.App.editApp.config', [ 'basicservice.App.editApp.service'])
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
angular.module('basicservice.App.editApp', [ 'basicservice.App.editApp.service','basicservice.App.editApp.filter','basicservice.App.editApp.config'])
    .controller('controller.basicservice.App.editApp',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"editApp" , "$state" , "utils"  ,"PAGINATION","$cookieStore" ,"info","msger","others","channel","users",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,editApp , $state , utils  ,PAGINATION, $cookieStore,info,msger,others,channel,users){
            $scope.infoList    = info();
            $scope.msgList     = msger();
            $scope.usersList   = users();
            $scope.channelList = channel();
            $scope.othersList  = others();
            $scope.item        = $scope.item || {} ;
            
            function getInfo(){
            	editApp.get( $stateParams.id ).success(function( res ){
                    $scope.list = res.data;
                    editApp.getExtend( res.data.id ).success(function( res ){
                        $scope.extend = res.data;
                    })
                    $(window).resize();
                })
            }
            getInfo();
            
            $('#editApp').on('click','.btn-type',function(){
                $scope.item.app_name = $(this).text();
                $scope.$apply();
                var workname = $scope.item.app_name;
                editApp.get(workname).success(function( res ){
                	
                    $scope.list = res.data.list;
                    var data = $scope.list[0];
                    $scope.item.id = data.id;
                    $scope.item.append_id = data.append_id;
                    $scope.item.signup = data.signup;
                    $scope.item.module = data.app_code;
                    $(window).resize();
                 })


            })
            
            $scope.ok = function(){
                //var item      = $scope.list;
                var append_id = $('#append_id').val();//扩展号
                var signup    = $('#signup').val();//签名
                var channel   = $('#channel').val();//SP通道
                var checked   = $('#is_url').prop('checked');//是否启用URL
                var url       = $('#url').val();//回调地址URL
                
                var item       = [];
                item.app       = $scope.list.app;
                item.users     = $scope.list.users;
                item.id        = $scope.list.id;
                
                item.append_id = append_id;
                item.signup    = signup;
                item.channel   = channel;
                item.checked   = checked;
                item.URL       = url;
                
                
                if(item){
                	editApp.update( item ).success(function( res ){
                		//console.info(res);
                        if( res.data == '0' ){
                            //$modal.dismiss('cancel');
                            $state.reload();
                        }
                        else{
                            angular.message( '操作成功' );
                        }
                    }).error(function(){
                        angular.message('操作失败！');
                    })
                   
                }
            }
            
        }])