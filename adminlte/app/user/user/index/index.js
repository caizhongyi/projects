/**
 * Created by DTO on 2015/4/27.
 */
var appUser = angular.module('user.user.index', ['user.user.index.service', 'user.user.index.filter']);

appUser.config(["$provide",function($provide){

    $provide.value('userStatus', function() {
        return [
            {type:0, name: "未知"},
            {type:1, name: "正常"},
            {type:2, name: "离职"},
            {type:4, name: "休长假"},
            {type:9, name: "暂停"},
            {type:10, name: "黑名单"},
            {type:101, name: "驳回"}
        ];
    });
    $provide.value('fromType', function() {
        return [
            {type:0, name: "车人脉"},
            {type:1, name: "v3业管"},
            {type:2, name: "业管"}
        ];
    });

}]);


appUser.controller('controller.user.user.index',[
    "$scope", "$rootScope", "users", "$stateParams", "$state", "$modal", "userStatus" , "fromType", "utils",
    function($scope, $rootScope, users, $stateParams, $state, $modal, userStatus , fromType, utils ){

    var currentPage =  $stateParams.currentPage || 1;
    var pageSize =  10;

    // 用来条件筛选
    $scope.search = $stateParams;
    // 用户状态列表
    $scope.userStatusList = userStatus();
    // 用户来源类型列表
    $scope.fromTypeList = fromType();

    $scope.itemsPerPage = pageSize;

    function getInfo() {
        users.get( currentPage, pageSize , $stateParams).success(function( res ) {
            if (res.code == 0) {
                $scope.list = res.data.list;

                $scope.totalItems = res.data.total;
                $scope.currentPage = currentPage;
            } else {
                utils.message(res.msg);
            }
        });
    }

    getInfo();

    $scope.edit = function(index){
        $scope.list[index].birthday_b = $scope.list[index].birthday * 1000;
        $scope.open( null , $scope.list[index] , 'tpl-update.html');
    }

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

appUser.directive('removeItem',[
    "$timeout", "users", "utils",
    function($timeout, users, utils ) {
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
                            utils.message( res.msg );
                        }
                    }).error(function(){
                        utils.message('删除失败！');
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
    "$scope", "$modalInstance", "$state", "users", "item", "userStatus" , "utils",
    function ($scope, $modalInstance, $state, users, item, userStatus , utils ) {
    $scope.item = item;
       
    $scope.submitted = false;
    $scope.interacted = function( field ){
        return  field.$dirty || $scope.submitted || field.isblur;
    }

    $scope.checkPhoneAvalibale = function( field ){
        var errors = [];
        for (var name in field.$error) {
            errors.push(name);
        }
        return (errors.length == 1);
    }

    $scope.userStatusList = userStatus();

    $scope.create = function (isValid) {
        $scope.submitted = true;
        if (isValid) {
            formartTime($scope.item.birthday);
            users.add( $scope.item ).success(function( res ){
                if( res.code == 0 ){
                    $modalInstance.dismiss('cancel');
                    $state.go($state.current.name , { currentPage : 0});
                }
                else{
                    utils.message( res.msg );
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
            users.update(  $scope.item ).success(function( res ){
                if( res.code == 0 ){
                    $modalInstance.dismiss('cancel');
                }
                else {
                    utils.message( res.msg );
                }
            }).error(function(){
                utils.message('请求失败!');
            })
        } else {
            utils.message('验证失败， 禁止更新！');
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
});
