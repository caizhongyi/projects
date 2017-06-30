/**
 * Created by Zhengby on 2015/07/14.
 * ?
 */

angular.module('change.picture.index', ['change.picture.index.service', 'change.picture.index.filter', 'utils.service'])
    .controller('controller.change.picture.index',function( $scope, $rootScope, $stateParams, $modal ,$log ,pictures , $state, area,$filter , utils ){

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

        function getInfo(){
            pictures.get( currentPage ,  pageSize  , $stateParams ).success(function( res ){
                //console.log( res.data.list);


                if( res.code == 0 ){
                    $scope.list = res.data.list;
                    /*for( var i in $scope.list){
                     $scope.list[i].checked = 0;
                     }
                     console.log($scope.list)*/
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
        $scope.hh = function(item) {
           // console.log(item.pic_check_ok);

            if(item.pic_check_ok==0) {
                $scope.open(null, item, 'tpl-update.html');
            }else{
                pictures.updatestatus( item ).success(function( res ){
                    if( res.code == 0 ){
                        //   $modalInstance.dismiss('cancel');
                        utils.message("修改成功！" );
                    }
                    else {
                        utils.message( res.msg );
                    }

                })
            }

            //console.log($scope.list);
        }
        //条件条件止
        $scope.findReason = function(item) {
                      
            $scope.pds = [  
                {name: 'a'},  
                {name: 'b'}  
            ];  
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
            $scope.open( null ,item , 'tpl-update.html');

        }
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




    .controller('controller.modal.instance', function ($scope, $modalInstance ,item , pictures , $state) {
        $scope.item = item;

       /* $scope.$watch( 'item.order_status_select'  , function(val){
            console.log("aaaaaawwww");
        })*/
        $scope.toggle1 = function(xx) {
           if (xx.status == "checked") {
               xx.status = "";
           } else {
               xx.status = "checked";
           }
        }
        $scope.update = function () {
            pictures.updatestatus( item ).success(function( res ){
                if( res.code == 0 ){
                    //   $modalInstance.dismiss('cancel');
                    utils.message("修改成功！" );

                }
                else {
                    utils.message( res.msg );
                }

            })
            
            
         /*   if (isValid) {
                feebackinfos.update(  $scope.item ).success(function( res ){
                    if( res.code == 0 ){
                        $modalInstance.dismiss('cancel');
                    }
                    else {
                        utils.message( res.msg );
                    }
                }).error(function(){
                    utils.message('请求失败!');
                })
            }*/
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });