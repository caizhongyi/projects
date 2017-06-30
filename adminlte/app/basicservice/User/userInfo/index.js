/**
 * Created by DTO on 2015/4/27.
 */
var appUser = angular.module('basicservice.User.userInfo', ['basicservice.User.userInfo.service']);

appUser.config(["$provide",function($provide){

    $provide.value('userStatus', function() {
        return [
            {type:0, name: "正常"},
            {type:1, name: "禁止"},
        ];
    });

}]);


appUser.controller('controller.basicservice.User.userInfo',
    ["$scope", "$rootScope", "basicserviceUsers", "$stateParams", "$state", "$modal", "userStatus" , "utils",
    function($scope, $rootScope, basicserviceUsers, $stateParams, $state, $modal, userStatus , utils ){

    var currentPage =  $stateParams.currentPage || 1;
    var pageSize =  10;

    // 用来条件筛选
    $scope.search = $stateParams;
    // 用户状态列表
    $scope.userStatusList = userStatus();


    $scope.itemsPerPage = pageSize;

    function getInfo() {
        basicserviceUsers.get( currentPage, pageSize , $scope.search).success(function( res ) {
            if (res.code == 0) {
                $scope.list = res.data.list;
                $scope.totalItems = res.data.total;
                $scope.currentPage = currentPage;
            } else {
                angular.message(res.msg);
            }
        });
    }

    getInfo();
    $scope.add = function(){
        $scope.open( null , {} , 'tpl-add.html');
    }

    $scope.open = function ( size , item , template) {
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

        modalInstance.result.then(function () {
            //   $scope.selected = selectedItem;
        }, function () {

        });
    };

    $scope.flushList = function(type) {
        var params = '';

        if (type == 0) { // 条件筛选
            params = angular.extend({}, $scope.search, { currentPage: 1});
        } else if(type == 1) {      // 分页筛选
            params = angular.extend({}, $stateParams, { currentPage: $scope.currentPage});
        }
        // todo 取消强制更新
        $state.go($state.current.name, params, {reload: true});
    }


    $scope.section = 'happy';
    $scope.toggle1 = function() {
        if ($scope.section === "happy") {
            $scope.section = "sad";
        } else {
            $scope.section = "happy";
        }
    }
}]);

appUser.directive('removeItem', ["$timeout", "users",function($timeout, users) {
    return {
        restrict : 'A',
        link : function(scope, element, attr) {
            element.click(function() {
                if (confirm("确定删除？")) {
                    users.remove( scope.user.id ).success(function( res ){
                        if( res.code == 0){
                            element.closest('tr').remove();
                        }
                        else{
                            angular.message( res.msg );
                        }
                    }).error(function(){
                        angular.message('删除失败！');
                    })
                }
            })
        }
    }
}]);

appUser.directive('bnTime',
    ["$timeout",function($timeout) {
        return {
            link : function(scope, element, attr) {
                var timer = $timeout(function(){
                    console.log("timeout executed", Date.now());
                }, 2000);

                timer.then(function(){
                    console.log("Timer resolved!", Date.now());
                }, function() {
                    console.log("Timer rejected!", Date.now());
                });

                $scope.$on("$destroy",  function(event) {
                    $timeout.cancel(timer);
                });
            }
        }
    }]);


appUser.controller('controller.modal.instance',
    ["$scope", "$modalInstance", "$state",  "basicserviceUsers", "item", "userStatus",
    function ($scope, $modalInstance, $state,  basicserviceUsers, item, userStatus) {
    $scope.item = item;

    $scope.submitted = false;
    $scope.interacted = function( field ){
        return  field.$dirty || $scope.submitted || field.isblur;
    }
    $scope.userStatusList = userStatus();

    $scope.create = function (isValid) {
        $scope.submitted = true;
        if (isValid) {
            basicserviceUsers.add( $scope.item ).success(function( res ){
                if( res.code == 0 ){
                    $modalInstance.dismiss('cancel');
                    $state.go($state.current.name , { currentPage : 0});
                }
                else{
                    angular.message( res.msg );
                }
            });
        }
    };

    $scope.update = function(form) {

        var names = [];
        for (var name in form.$error) {
            names.push(name);
        }
        // 暂时解决日期验证不通过， 后期改进
        if (names.length == 1 && names[0] == 'date' ) {
            isValid = true;
        } else {
            isValid = form.$valid;
        }

        $scope.submitted = true;
        if (isValid) {
            formartTime($scope.item.birthday_b);
            basicserviceUsers.update(  $scope.item ).success(function( res ){
                if( res.code == 0 ){
                    $modalInstance.dismiss('cancel');
                }
                else {
                    angular.message( res.msg );
                }
            }).error(function(){
                angular.message('请求失败!');
            })
        } else {
            angular.message('验证失败， 禁止更新！');
        }
    }

    function formartTime($time) {
        var tmp = new Date($time);
        $scope.item.birthday = tmp.getTime() / 1000;
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    // angular指令日期插件代码
    $scope.clear = function () {
        $scope.item.birthday = null;
    };
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startopened = true;
    };
    $scope.maxDate = new Date();

//    $scope.disabled = function(date, mode) {
//        console.log(date.getDate());
////        return ( mode === 'day' && ( date.getDate() ) );
//    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.format = 'yyyy-MM-dd';
}]);
