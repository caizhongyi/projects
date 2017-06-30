/**
 * Created by DTO on 2015/4/27.
 */
 angular.module('mbs.security.index', [])
     .controller('controller.mbs.security.index',
    [ "$scope" ,"$rootScope" , "$stateParams" , "$cookieStore" , "security" , "utils",
    function( $scope ,$rootScope , $stateParams , $cookieStore , security , utils ){
    $rootScope.codeCollection = {};
    $scope.signout = security.signout;

    /* $('#login-box').appendTo('body');
     $('#main').hide();*/

    var userInfo = $cookieStore.get("user");

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

    if (!userInfo) {
        if( $stateParams.type == 1 ){
            utils.loginByToken( $stateParams , function( res ){
                if( res.code == 0 ){
                    var user = res.data;
                    user.token = $scope.user.token;
                    setMenus($scope.profile = user);
                    security.signin(user);
                }
                else {
                    message(res.msg);
                }
            }).error(function () {
                message("�޷����ʣ�");
            })
        }
        else{
            security.signout();
        }
    }
    else {
        setMenus(userInfo);
        $scope.profile = userInfo;
        if (!$.cookie('token')) {
            utils.getToken().success(function (data) {
                $.cookie('token', data.data.access_token);
                $scope.profile.token = data.data.access_token;
                $cookieStore.put('user', $scope.profile);
            })
        }
    }

    $scope.submitted = false;
    $scope.interacted = function (field) {
        return field.$dirty || $scope.submitted || field.isblur;
    }

    $scope.submitForm = function (isValid) {
        $scope.submitted = true;
        var message = function (msg) {
            $('#tips-info').html('<i class="fa fa-info-circle"></i> ' + msg);
        }

        if (!isValid) {
            message("��֤ʧ��!");
        }
        else {
            utils.getToken().success(function (data) {
                if( data.code == 0 ){
                    $scope.user.token = data.data.access_token;
                    $scope.user.password = $.md5($scope.user.password);
                    if (data.code == 0) {
                        $.cookie('token', data.data.access_token, {expires: 1 / 12, secure: true});
                        utils.login($scope.user).success(function (res) {
                            if (res.code == 0) {
                                var user = res.data;
                                user.token = $scope.user.token;
                                setMenus($scope.profile = user);
                                security.signin(user);
                            }
                            else {
                                message(res.msg);
                            }
                        });
                    } else {
                        message(data.msg);
                    }
                }
                else{
                    message(data.msg);
                }
            }).error(function () {
                message("�޷����ʣ�");
            })
        }
    };
}])
