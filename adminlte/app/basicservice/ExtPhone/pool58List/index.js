angular.module('basicservice.ExtPhone.pool58List.config', [ 'basicservice.ExtPhone.pool58List.service'])
    .config(["$provide",function($provide) {
        $provide.value('sourceArr58', function() {
            return [
                {type:'58', name: "58(58)"},
            ];
        });

        $provide.value('statusArr', function() {
            return [
                {type:'-1', name: "未使用"},
                {type:'0', name: "已解绑"},
                {type:'1', name: "已绑定"},
            ];
        });

    }]);
angular.module('basicservice.ExtPhone.pool58List', [ 'basicservice.ExtPhone.pool58List.service',"basicservice.ExtPhone.pool58List.config","basicservice.ExtPhone.pool58List.filter"])
    .controller('controller.basicservice.ExtPhone.pool58List',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"identify58" , "$state" , "utils"  ,"PAGINATION","$cookieStore" , "statusArr","sourceArr58",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,identify58 , $state , utils  ,PAGINATION, $cookieStore,statusArr,sourceArr58 ){
           
            $scope.searchData = {} ;
            $scope.maxSize = PAGINATION.maxSize;
            $scope.searchCondition = $scope.searchCondition || {};
            var pageSize =  $stateParams.pageSize || 25;//PAGINATION.pageSize ;
            var currentPage =  $stateParams.currentPage || PAGINATION.currentPage;

            $scope.searchData = $stateParams ;
            $scope.statusList = statusArr();
            $scope.sourceList = sourceArr58();
            //$scope.searchData.source = 10;
            //$scope.searchData.fix_source = 1;

            var isChange = false;
            function getInfo(){
                identify58.get( currentPage ,  pageSize ,  $scope.searchData ).success(function( res ){
                    $scope.list = res.data.list;
                    $scope.totalItems = res.data.total;
                    $scope.currentPage = currentPage;
                    //$scope.totalPages =  Math.ceil($scope.totalItems / pageSize);
                    //console.log($scope.numPages);
                    $(window).resize();
                })
            }

            $scope.searchChange = function(){
                isChange = true ;
            }
            
            function flush (){
                if( isChange )  $scope.currentPage = 0 ;
                //$scope.searchData.start_date = utils.dateFormat($scope.searchData.start_date)
                //$scope.searchData.end_date = utils.dateFormat($scope.searchData.end_date)
                $scope.searchData.currentPage = $scope.currentPage ;
                console.log($scope.searchData)
                $state.go($state.current.name ,  $scope.searchData ,{ reload : true } );
                isChange = false ;
            }
            
            $scope.searchInfo = $scope.pageChanged = function(){
                flush ();
            };
            
            getInfo();
        }])