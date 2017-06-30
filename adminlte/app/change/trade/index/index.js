/**
 * Created by Zhengby on 2015/07/14.
 * ?
 */

angular.module('change.trade.index', ['change.trade.index.service', 'change.trade.index.filter', 'utils.service'])
    .controller('controller.change.trade.index',function( $scope, $rootScope, $stateParams, $modal ,$log ,trades , $state, area,$filter,$compile , utils ){

    /* area.carfee( ).success(function( res ){
     console.log( res.data);
     })*/

    /*  console.log(area.carfee( ));*/
    //$scope.searchData = {} ;
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


    $scope.itemsPerPage = pageSize;

    $scope.hh = function(item) {
        trades.updatestatus( item ).success(function( res ){
            if( res.code == 0 ){
                utils.message("修改成功！" );
            }
            else {
                utils.message( res.msg );
            }
        })
        /* console.log("aaaaa");
        //仅当不可过户时需要选择
            if(item.isallow==0) {
                var s = angular.element(document.getElementById("F"+item.order_id));
                $scope.order_id=item.order_id;
                s.html("");
                var template = "<select id="+item.order_id+"  ng_model='item.reason' ng-change='abc(item)' >" +
                    "<option value='0'>请选择</option>" +
                    "<option value='B'>B-转出</option>" +
                    "<option value='C'>C-被盗抢</option>" +
                    "<option value='D'>D-停行</option>" +
                    "<option value='E'>E-注销</option>" +
                    "<option value='G'>G-违章</option>" +
                    "<option value='H'>H-海关监管</option>" +
                    "<option value='I'>I-事故未处理</option>" +
                    "<option value='K'>K-查封</option>" +
                    "<option value='M'>M-强制注销</option>" +
                    "<option value='O'>O-锁定</option></select>" ;

                var elems  = $compile(template)($scope); //通过$compile动态编译
                s.html(elems); //给元素赋值
            }else{
                var s = angular.element(document.getElementById("F"+item.order_id));
                console.log( s)
                s.html("");
                var k = angular.element(document.getElementById("D"+item.order_id));
                k.html("");

                item.isallow=1;
         trades.updatestatus( item ).success(function( res ){
                    if( res.code == 0 ){
                        utils.message("修改成功！" );
                    }
                    else {
                        utils.message( res.msg );
                    }
                })
            };*/
    }

    $scope.abc = function(item) {
        item.order_id=$scope.order_id;
        item.isallow=0;
       // console.log(item);

        var k = angular.element(document.getElementById("D"+item.order_id));
        k.html("AAAAA");
        if(item.reason)
            trades.updatestatus( item ).success(function( res ){
            if( res.code == 0 ){
             //   $modalInstance.dismiss('cancel');
                utils.message("修改成功！" );
                $state.reload();//刷新当前页面
            }
            else {
                utils.message( res.msg );
            }

        })
    };
        $scope.qq = function(item) {

            //仅当不可过户时需要选择
            if(item.isallow==0) {
                trades.updatestatus( item ).success(function( res ){
                    if( res.code == 0 ){
                        //   $modalInstance.dismiss('cancel');
                        utils.message("修改成功！" );

                    }
                    else {
                        utils.message( res.msg );
                    }

                })
            }else{
                var s = angular.element(document.getElementById(item.order_id));
                //console.log( s)
                s.html("");
                /* var k = angular.element(document.getElementById("D"+item.order_id));
                 K.value("");
                 */

                item.isallow=1;
                trades.updatestatus( item ).success(function( res ){
                    if( res.code == 0 ){
                        utils.message("修改成功！" );
                    }
                    else {
                        utils.message( res.msg );
                    }
                })
            };
        }

    function getInfo(){
        trades.get( currentPage ,  pageSize  , $stateParams ).success(function( res ){


            if( res.code == 0 ){
                $scope.list = res.data.list;
                /*for( var i in $scope.list){
                    $scope.list[i].checked = 0;
                }
                console.log($scope.list)*/
                //console.log($scope.list[0]);
                $scope.totalItems = res.data.total;
                $scope.currentPage = currentPage;
            }else{
                utils.message( res.msg );
            }
        })
    }
    $scope.pageChanged = function(){
        $state.go($state.current.name , getParams($stateParams));
    };

    getInfo();
        //查询条件起
    $scope.reasonList = [
        {id:'B', name: "B-转出"},
        {id:'C', name: "C-被盗抢"},
        {id:'D', name: "D-停行"},
        {id:'E', name: "E-注销"},
        {id:'G', name: "G-违章"},
        {id:'H', name: "H-海关监管"},
        {id:'I', name: "I-事故未处理"},
        {id:'K', name: "K-查封"},
        {id:'M', name: "M-强制注销"},
        {id:'O', name: "O-锁定"},

    ];

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




.controller('controller.modal.instance', function ($scope, $modalInstance ,item , trades , $state , utils ) {
    $scope.item = item;

    $scope.update = function (isValid) {
        if (isValid) {
            trades.update(  $scope.item ).success(function( res ){
                if( res.code == 0 ){
                    $modalInstance.dismiss('cancel');
                }
                else {
                    utils.message( res.msg );
                }
            }).error(function(){
                utils.message('请求失败!');
            })
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});