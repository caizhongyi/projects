angular.module('basicservice.Work.addWork', [ 'basicservice.Work.addWork.service'])
    .controller('controller.basicservice.Work.addWork',
    [ "$scope", "$rootScope" ,"$modal"  , "work" , "$state" , "PAGINATION" ,"$stateParams","$cookieStore" ,
        function( $scope, $rootScope ,$modal , work , $state , PAGINATION ,$stateParams ,$cookieStore ){
            function getInfo(){
                work.get().success(function( res ){
                    if(res.code == 0) {
                        $scope.list = res.data.list;
                        var bigtype = [], smalltype = [];

                        for (var i = 0; i < $scope.list.length; i++) {
                            if ($scope.list[i].type_id.length == 2) {
                                bigtype.push($scope.list[i]);
                            } else {
                                smalltype.push($scope.list[i]);
                            }
                        }
                        $scope.bigtype = bigtype;
                        $scope.smalltype = smalltype;
                        $(window).resize();
                    }
                })
            }
            getInfo();
            var solver = $cookieStore.get('user') || {};
            $scope.item = $scope.item || {};
            $scope.ok = function () {
                var item = $scope.item ;

                if( item )
                    item.solver = solver.real_name;
                  var arr = [] ;
                  for(var i = 0 ; i < $scope.list.length ; i++){
                     if($scope.list[i].checked){
                        arr.push( $scope.list[i].type_id);
                     }
                  }
                 item.work_type = arr.join(',');
                work.add( item ).success(function( res ){
                    if( res.code == 0 ){
                        //$modal.dismiss('cancel');
                            $state.reload();
                    }
                    else{
                        angular.message( res.msg );
                    }
                }).error(function(){
                    angular.message('添加失败！');
                })
            };
        }])