/**
 * Created by DTO on 2015/4/27.
 */
var appUser = angular.module('mbs.index.home', []);
appUser.controller('controller.mbs.index.home',[
    "$scope" ,"$rootScope", "$stateParams" , "$cookieStore" , "security" , "utils",
    function( $scope ,$rootScope, $stateParams , $cookieStore , security , utils ){
    //Make the dashboard widgets sortable Using jquery UI

    function setMenus(userInfo) {
        var $sideMenus = $('.sidebar-menu');

        if( userInfo.username == 'admin' ){
            var $elem = $sideMenus.find('[ui-sref]').closest('li');
            var $node = $elem.closest('.treeview');
            if ($node.is(':hidden')) $node.stop(true, true).slideDown();
            $elem.stop(true, true).show();
            return ;
        }
        utils.getCurrentCodes(userInfo).success(function (res) {
            $rootScope.codeCollection = res.data;
            $sideMenus.find('[ui-sref]').each(function(  ){
                var sref  = $(this).attr('ui-sref').toLowerCase(), $elem = $(this).closest('li');

                var codes = $rootScope.codeCollection.codes ;

                for( var i = 0 ; i < codes.length;  i ++ ){
                    if( sref == codes[i].replace(/\./g, '-').replace(/\|/g, '-')){
                        if ($elem.length && $elem.is(':hidden')) {
                            var $node = $elem.closest('.treeview');
                            if ($node.is(':hidden')) $node.stop(true, true).slideDown();
                            $elem.stop(true, true).show();
                        }
                        continue;
                    }
                }
            })

            $('.content-wrapper').css('min-height', 900)
        })
    }

    /*if( $stateParams.type == 1 ){
        utils.loginByToken( $stateParams ).success(function( res ){
            if( res.code == 0 ){
                var user = res.data;
                user.token = $stateParams.token;
                setMenus($rootScope.profile = user);
                $state.go('settlement-order-orderList', {}, {reload: true});
            }
            else {
                // message(res.msg);
            }
        }).error(function () {
            //   message("ÎÞ·¨·ÃÎÊ£¡");
        })
    }
    else{

    }*/

    $scope.name = "my"
    $scope.str = "mystrs"
    $scope.fn = function(){ alert( 1)}
   // $(".connectedSortable .box-header, .connectedSortable .nav-tabs-custom").css("cursor", "move");
}])
    .directive('sortable', ["$timeout" , function ($timeout) {
         return {
             restrict: 'A',
             scope : {
             },
             link: function(scope, element, attrs) {
                  var defaults = {
                      placeholder: "sort-highlight",
                      connectWith: ".connectedSortable",
                      handle: ".box-header, .nav-tabs",
                      forcePlaceholderSize: true,
                      zIndex: 999999
                  }
                // if (scope.$last === true) {
                    $timeout(function() {
                        //scope.$emit('ngPaginationFinished');
                        element.sortable( angular.extend( defaults , attrs ) );
                    });
                //}
            }
        }
    }])