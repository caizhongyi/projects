angular.module('basicservice.ExtPhone.bindList.config', [ 'basicservice.ExtPhone.bindList.service'])
    .config(["$provide",function($provide) {
        $provide.value('sourceArr', function() {
            return [
                {type:'10', name: "273(10)"},
                {type:'52', name: "爱卡(52)"},
                {type:'53', name: "赶集(53)"},
                {type:'54', name: "百姓(54)"},
                {type:'58', name: "58(58)"},
                {type:'99', name: "固定(99)"},
            ];
        });

        $provide.value('statusArr', function() {
            return [
                {type:'-1', name: "未绑定"},
                {type:'0', name: "已解绑"},
                {type:'1', name: "已绑定"},
            ];
        });

    }]);
angular.module('basicservice.ExtPhone.bindList', [ 'basicservice.ExtPhone.bindList.service',"basicservice.ExtPhone.bindList.config","basicservice.ExtPhone.bindList.filter"])
    .controller('controller.basicservice.ExtPhone.bindList',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"identify" , "$state" , "utils"  ,"PAGINATION","$cookieStore" , "statusArr","sourceArr",
        function( $scope,$rootScope, $stateParams, $modal ,$log ,identify , $state , utils  ,PAGINATION, $cookieStore,statusArr,sourceArr ){
            
            $scope.searchData = {} ;
            $scope.maxSize = PAGINATION.maxSize;
            $scope.searchCondition = $scope.searchCondition || {};
            var pageSize =  25 ;
            var currentPage =  $stateParams.currentPage || PAGINATION.currentPage;
            
            $scope.searchData = $stateParams ;
            $scope.statusList = statusArr();
            $scope.sourceList = sourceArr();
            $scope.showFenye = $stateParams.username > 0 ? true : false;
            var isChange = false;
            function getInfo(){
                identify.get( currentPage ,  pageSize ,  $scope.searchData ).success(function( res ){
                    $scope.list = res.data.list;
                    $scope.totalItems = res.data.total;
                    $scope.currentPage = currentPage;
                    $scope.totalPages =  $scope.totalItems % pageSize  ;
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
                console.log($scope.searchData)
                $state.go($state.current.name ,  $scope.searchData ,{ reload : true } );
                isChange = false ;
            }
            
            $scope.searchInfo = $scope.pageChanged = function(){
                flush ();
            };
            
            getInfo();
        }])
