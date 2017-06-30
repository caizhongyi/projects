angular.module('basicservice.App.channelDosage.config', [ 'basicservice.App.channelDosage.service'])
    .config(["$provide",function($provide) {
        $provide.value('channelF', function() {
            return [
                {type:'4006-030-273', channel: "273WEB", relay: "63089200", first:"7"},
                {type:'4000-018-273', channel: "273mobile", relay: "63089201", first:"7"},
                {type:'4000-180-273', channel: "273APP", relay: "63089202", first:"7"},
                {type:'4000-086-273', channel: "273全网发车", relay: "63089203", first:"8"},
                {type:'4000-810-273', channel: "百姓", relay: "63089204", first:"7"},
                {type:'4008-773-273', channel: "车购宝", relay: "63089211", first:""},
                {type:'4008-550-273', channel: "回拨", relay: "63089205", first:""},
                {type:'4008-270-273', channel: "全网发车58", relay: "63089206", first:"58"},
                {type:'4008-276-273', channel: "全网发车赶集", relay: "63089207", first:"53"},
                {type:'4008-279-273', channel: "全网发车爱卡", relay: "63089208", first:"52"},
                {type:'4008-373-273', channel: "全网发车", relay: "63089209", first:""},
                {type:'4008-375-273', channel: "全网发车", relay: "63089210", first:""},
                {type:'4008-773-273', channel: "云南WEB", relay: "63089211", first:""},
                {type:'4008-788-273', channel: "云南M站", relay: "63089212", first:""},
                {type:'4008-862-273', channel: "云南APP", relay: "63089213", first:""},
                {type:'4008-873-273', channel: "福建WEB", relay: "63089214", first:""},
                {type:'4008-890-273', channel: "福建M站", relay: "63089215", first:""},
                {type:'4009-918-273', channel: "福建APP", relay: "63089216", first:""},
                {type:'4008-558-273', channel: "共用WEB", relay: "63089217", first:""},
                {type:'4009-919-273', channel: "共用M站", relay: "63089218", first:""},
                {type:'4009-989-273', channel: "共用APP", relay: "63089219", first:""},
                {type:'ucpaas', channel: "云之讯", relay: "63089200", first:"7", number:"4006-030-273"},
                {type:'qingmayun', channel: "轻码云", relay: "", first:"", number:""},
            ];
        });
    }]);
angular.module('basicservice.App.channelDosage', [ 'basicservice.App.channelDosage.service',"basicservice.App.channelDosage.config","basicservice.App.channelDosage.filter"])
    .controller('controller.basicservice.App.channelDosage',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"countF" , "$state" , "utils"  ,"PAGINATION","$cookieStore" ,
        function( $scope,$rootScope, $stateParams, $modal ,$log ,countF , $state , utils  ,PAGINATION, $cookieStore ){
            
            function getInfo(){
            	countF.get().success(function( res ){
                    $scope.list = res.data;
                    $(window).resize();
                })
            }
            getInfo();
            
}])