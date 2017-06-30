/**
 * Created by zhengby on 2015/07/13
 * ?
 */
angular.module('change.businfo.index', ['change.businfo.index.service', 'change.businfo.index.filter', 'utils.service'])
    .controller('controller.change.businfo.index',function( $scope, $rootScope, $stateParams, $modal ,$log ,businfos , $state, area , utils ){


        /*area.carfee( ).success(function( res ){
           console.log( res.data);
        })*/

        var currentPage =  $stateParams.currentPage || 1;
        var pageSize =  10 ;

        // 用来条件筛选
        $scope.search = $stateParams;
        //console.log( $scope.search);
        $scope.itemsPerPage = pageSize;

        function getInfo(){
            businfos.get( currentPage ,  pageSize  , $stateParams ).success(function( res ){
                // console.log( res.data.carList);
                if (res.code == 0) {
                    $scope.list = res.data.carList;
                    $scope.totalItems = res.data.total;
                    $scope.currentPage = currentPage;
                } else {
                    utils.message(res.msg);
                }

            })
        }
        $scope.pageChanged = function(){
            $state.go($state.current.name , getParams($stateParams));
        };

        getInfo();

        // 获取请求列表请求参数
        function getParams(params) {
           // console.log(params.car_type);
          /*  if(params.car_type != 'undefined'||params.car_type!=""){
                for(var p in params.car_type){
                   // console.log(params.car_type[p]);
                    params.car_type = params.car_type[p];
                    break;
                }
            }*/
            //params.car_type = JSON.stringify(params.car_type);//把对像转为字符串
            
            return angular.extend({}, params, { currentPage: $scope.currentPage});
        }
        // 筛选条件
        $scope.searchAction = function() {
           // console.log($scope.search);
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
        //条件条件止

        $scope.edit = function(){
            $scope.open( null , this.item , 'tpl-update.html');
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




    .controller('controller.modal.instance', function ($scope, $modalInstance ,item , businfos , $state , utils ) {
        $scope.item = item;

        businfos.getDeptLevels().success(function( res ){
            if (res.code == 0) {
                $scope.deptLevels = res.data;
            }
        });
        $scope.update = function (isValid) {
            if (isValid) {
                businfos.update(  $scope.item ).success(function( res ){
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