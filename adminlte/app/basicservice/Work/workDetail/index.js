angular.module('basicservice.Work.workDetail.config', [ 'basicservice.Work.workDetail.service'])
    .config(["$provide",function($provide) {
        $provide.value('worktype', function() {
            return [
                {type:0, name: "进行中"},
                {type:1, name: "已处理"},
                {type:2, name: "无法处理"},
                {type:3, name: "转移"},
            ];
        });
    }]);

angular.module('basicservice.Work.workDetail', [ 'basicservice.Work.workDetail.service',"basicservice.Work.workDetail.config","basicservice.Work.workDetail.filter"])
    .controller('controller.basicservice.Work.workDetail',
    [ "$scope", "$rootScope" ,"$modal"  , "$state" ,"workDetail" ,"worktype","PAGINATION" ,"$stateParams","$cookieStore" ,
        function( $scope, $rootScope ,$modal ,  $state ,workDetail,worktype, PAGINATION ,$stateParams ,$cookieStore ){
            $scope.typeList = worktype();
           function getInfo() {
               workDetail.get($stateParams.id).success(function(res){
                   $scope.item = res.data;
               })
           }
           getInfo();
            $scope.update = function() {
                for(var i = 0;i < $scope.typeList.length; i++) {
                    if($scope.typeList[i].checked == $scope.typeList[i].type ) {
                        $scope.item[0].status = $scope.typeList[i].type;
                    }
                }
                console.log($scope.item);
                workDetail.update(/*$scope.item*/).success(function(res) {
                    if( res.code == 0 ){
                        /*$state.reload();*/
                    }
                    else{
                        angular.message( res.msg );
                    }
                }).error(function(){
                    angular.message('添加失败！');
                })

            }
        }])