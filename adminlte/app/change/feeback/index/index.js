/**
 * Created by Zhnegby on 2015/07/14.
 * ?
 */

angular.module('change.feeback.index', ['change.feeback.index.service', 'change.feeback.index.filter', 'utils.service'])
    .controller('controller.change.feeback.index',function( $scope, $rootScope, $stateParams, $modal ,$log ,feebackinfos , $state, area,$filter , utils ){

    var currentPage =  $stateParams.currentPage || 1;
    var pageSize =  10 ;

    // 转换成可读时间格式
    if ($stateParams.max_create) {
        var tmp = new Date($stateParams.max_create);
        $stateParams.max_create = $filter('date')(tmp.getTime(), 'yyyy-MM-dd');
    }
    if ($stateParams.min_create) {
        var tmp = new Date($stateParams.min_create);
        $stateParams.min_create = $filter('date')(tmp.getTime(), 'yyyy-MM-dd');
    }

    // 用来条件筛选
    $scope.search = $stateParams;
    //console.log($scope.search);
    $scope.itemsPerPage = pageSize;

    function getInfo(){
        feebackinfos.get( currentPage ,  pageSize  , $stateParams ).success(function( res ){
           //console.log( res.data.feebackList);
            if( res.code == 0 ){
                $scope.list = res.data.feebackList;
                $scope.totalItems = res.data.total;
                $scope.currentPage = currentPage;
            }else {
                utils.message( res.msg );
            }

        })
    }
    $scope.pageChanged = function(){
        $state.go($state.current.name , getParams($stateParams));
    };

    getInfo();
    // 获取请求列表请求参数
    function getParams(params) {
        //console.log(params);
        return angular.extend({}, params, { currentPage: $scope.currentPage});
    }
    // 筛选条件
    $scope.searchAction = function() {

        //console.log($scope.search);
        if (!$scope.search) {
            $scope.search = {};
        }
        // 解决缓存问题 临时解决搜索无效问题
        if ($scope.currentPage) {
            $scope.currentPage = 0;
        } else {
            $scope.currentPage = 1;
        }

        $state.go($state.current.name,  getParams($scope.search));
    }



    //日期起
    // angular指令插件代码
    $scope.clear = function () {
        $scope.search.min_create = null;
        $scope.search.max_create = null;
    };
    $scope.startopen = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startopened = true;
    };
    $scope.endopen = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.endopend = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.format = 'yyyy-MM-dd';
    //条件条件止

    $scope.open = function (size , item, template) {
        var modalInstance = $modal.open({
            templateUrl: template,
            controller: 'controller.modal.instance',
            size: size,
            resolve: {
                item: function () {
                    return item;
                }
            }
        });

        //弹出结果
        modalInstance.result.then(function () {
        }, function () {

        });
    };
})




.controller('controller.modal.instance', function ($scope, $modalInstance ,item , feebackinfos , $state) {
    $scope.item = item;
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});