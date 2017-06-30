angular.module('basicservice.Work.workList.config', [ 'basicservice.Work.workList.service'])
    .config(["$provide",function($provide) {
        $provide.value('workstatus', function() {
            return [
                {type:0, name: "待处理"},
                {type:1, name: "已处理"},
                {type:2, name: "已关闭"},
                {type:3, name: "待回复"},
            ];
        });
    }]);
angular.module('basicservice.Work.workList', [ 'basicservice.Work.workList.service',"basicservice.Work.workList.config","basicservice.Work.workList.filter"])
    .controller('controller.basicservice.Work.workList',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"work" , "$state" , "utils"  ,"PAGINATION","$cookieStore" , "workstatus",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,work , $state , utils  ,PAGINATION, $cookieStore,workstatus ){
            function getTypeInfo() {
                work.getType().success(function(res){
                        $scope.typeList = res.data.list;
                    var bigtype = [],smalltype = [];
                    for(var i = 0; i < $scope.typeList.length ; i++) {
                        if($scope.typeList[i].type_id.length == 2) {
                            bigtype.push( $scope.typeList[i]);
                        } else {
                            smalltype.push($scope.typeList[i]);
                        }
                    }

                    for(var i = 0; i < bigtype.length ; i++) {
                        for(var b = 0; b < smalltype.length ; b++) {
                            if(smalltype[b].type_id.substr(0,2) == bigtype[i].type_id) {
                                if(!bigtype[i].issue ) {
                                    bigtype[i].issue = [];
                                }
                                bigtype[i].issue.push(smalltype[b]);
                            }
                        }
                    }
                    $scope.bigtype = bigtype;
                    $(window).resize();
                })

            }
            getTypeInfo();
            $scope.searchData = {} ;
            $scope.maxSize = PAGINATION.maxSize;
            $scope.searchCondition = $scope.searchCondition || {};
            var pageSize =  PAGINATION.pageSize ;
            var currentPage =  $stateParams.currentPage || PAGINATION.currentPage;

            $scope.searchData = $stateParams ;
            $scope.workstatusList = workstatus();

            var isChange = false;

            function getInfo(){
                work.get( currentPage ,  pageSize ,  $scope.searchData ).success(function( res ){
                    $scope.list = res.data.list;
                    $scope.totalItems = res.data.total;
                    $scope.currentPage = currentPage;
                    $scope.totbalPage =  $scope.totalItems % pageSize  ;
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
                $state.go($state.current.name ,  $scope.searchData ,{ reload : true } );
                isChange = false ;
            }

            $scope.searchInfo = $scope.pageChanged = function(){
                flush ();
            };

            getInfo();

            $scope.add = function(){
                $state.go('basicservice-Work-addWork');
            }

        }])
