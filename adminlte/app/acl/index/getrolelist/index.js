/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('acl.index.getrolelist', [
    'acl.index.getrolelist.service' ,
    'ui.router'
    ])
    .controller('controller.acl.index.getrolelist',
    [ "$scope", "$rootScope", "$stateParams", "$modal" ,"$log" ,"roles" , "$state" , "utils" , "modules" , "PAGINATION" ,
        function( $scope,$rootScope, $stateParams, $modal ,$log ,roles , $state , utils , modules , PAGINATION ){
        $scope.searchData = {} ;
        $scope.maxSize = PAGINATION.maxSize;
        var currentPage =  $stateParams.currentPage || PAGINATION.currentPage;
        var pageSize =  PAGINATION.pageSize ;
        var searchName =  $stateParams.searchName || '';
        var isChange = false;
        function getInfo(){
            roles.get( currentPage ,  searchName  , pageSize ).success(function( res ){
                $scope.list = res.data.list;
                $scope.totalItems = res.data.total;
                //$rootScope.rootCurrentPage =
                $scope.currentPage  = currentPage;
                $scope.searchData.name = searchName ;
                $(window).resize();
                 /* $scope.emit('pageChanged', {
                    currentPage : currentPage,
                    searchData :  $scope.searchData
                 });*/
            })
        }

        $scope.searchChange = function(){
            isChange = true ;
        }

        function go (){
            if( isChange )  $scope.currentPage = 0 ;
            $state.go($state.current.name , { currentPage : $scope.currentPage , searchName : $scope.searchData.name });
            isChange = false ;
        }

        $scope.searchInfo = $scope.pageChanged = function(){
            go ();
        };

        getInfo();

        $scope.edit = function(  ){
            $scope.open( null , this.item );
        }
        $scope.add = function(){
            $scope.open( null , {} );
        }
        $scope.open = function ( size , item ) {
            var modalInstance = $modal.open({
                templateUrl: 'tpl-add.html',
                controller: 'controller.modal.instance',
                size: size,
                resolve: {
                    item: function () {
                        return item;
                    },
                    currentPage : function(){
                        return currentPage;
                    }
                }
            });

            //弹出结果
            modalInstance.result.then(function () {
            //   $scope.selected = selectedItem;
            }, function () {

            });
        };
        $scope.openRoleUser = function () {
            var item = this.item ;
            $modal.open({
                templateUrl: 'tpl-role-user.html',
                controller: ["$scope" , "$modalInstance" , "item" , "roles" , "utils" ,function( $scope , $modalInstance , item , roles , utils ){
                    $scope.myUsers = [];
                    $scope.item = item;
                    function swtichList( list , model , targetList ){
                        if( !$scope[model] || !$scope[model].length ){
                            utils.message("请选择一个用户!");
                            return ;
                        }
                        function render (){
                             if( !$scope[targetList] )  $scope[targetList] = [] ;
                                $scope[targetList] = $scope[targetList].concat( $scope[model] );
                                $scope[model].forEach( function( n , i ){
                                    $scope[list].splice(  $scope[list].indexOf( n ) , 1 );
                                })
                                $scope[model] = [] ;
                                $scope[list][0] && $scope[model].push($scope[list][0]);
                         }

                        if( list == 'myUsers'){
                            var ids = [] ;

                            $scope.myUser.forEach(function( n ){
                                ids.push( n.id );
                            })

                            roles.deleteUserRole({
                                roleId :  item.id,
                                userIds : ids.join(',')
                            }).success(function( res ){
                                if( res.code == 0 ){
                                    render ()
                                }
                                else{
                                    utils.message( res.message );
                                }
                            }).error(function(){
                                utils.message('修改失败！');
                            })
                        }
                        else{
                            var ids = [] ;

                            $scope.user.forEach(function( n ){
                                ids.push( n.id );
                            })

                            roles.updateUsers({
                                roleId :  item.id,
                                userIds : ids.join(',')
                            }).success(function( res ){
                                if( res.code == 0 ){
                                    render ()
                                }
                                else{
                                    utils.message( res.message );
                                }
                            }).error(function(){
                                utils.message('修改失败！');
                            })
                        }

                    }

                    function userDefault (){
                        $scope.user = [] ;
                        $scope.users[0] && $scope.user.push($scope.users[0]);
                    }

                    $scope.searchUsers = function(){
                        utils.searchUsers( $scope.searchUsersKeyword ).success(function( res ){
                            var u =  res.data.list || [] ;
                            $scope.myUsers.forEach( function( n ){
                                var elem = utils.findById( u , n.id );
                                if( elem ){
                                    u.splice( u.indexOf( elem )  , 1) ;
                                }
                            })
                            $scope.users = u ;
                            userDefault ();
                        })
                    }

                    $scope.addUser = function(){
                        swtichList( 'users' , 'user' , 'myUsers');
                    }
                    $scope.removeUser = function(){
                        swtichList( 'myUsers' , 'myUser' , 'users');
                    }

                    $scope.name = item.role_name;

                    roles.getUsersById( item.id ).success(function( res ){
                        if( res.code == 0 ){
                            $scope.myUsers = res.data ;
                        }
                        else{
                            utils.message( res.msg );
                        }
                    }) ;
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }],
                resolve: {
                    item: function () {
                        return item;
                    }

                },
                size: 'lg'
            });
        };

            $scope.openRoleCode = function () {
                var item = this.item ;
                $modal.open({
                    templateUrl: 'tpl-role-code.html',
                    controller: ["$scope" , "$modalInstance" , "item" , "modules",function( $scope , $modalInstance , item , modules ){
                        $scope.item = item;
                        $scope.setCode = function(){
                            roles.setCode( item.id , this.item.code );
                        }

                        modules.getAll().success(function(res){
                            if(res.code == 0){
                                $scope.codes = res.data;

                                roles.getCodes(item.id).success(function (res) {
                                    if(res.code == 0){


                                        $scope.outcodes = res.body;
                                        $scope.codes = $scope.codes.concat($scope.outcodes);

                                        console.log($scope.codes);
                                    }
                                    else{
                                        utils.message( 11 );
                                    }

                                })

                                $scope.getCodes = function( name ,i ){
                                    $scope.selectedIndex = i ;
                                    modules.getCodeByName( name ).success(function(res){
                                        var codes ;
                                        var isOpen = [];

                                        function setCodes( codes ){
                                            if( codes ){
                                                roles.getCodeById( item.id ).success(function(res){
                                                    if(res.code == 0) {
                                                        var currentCodes =  res.data ;

                                                        var index = 0 ;
                                                        for(var i in codes){
                                                            var item = codes[i];
                                                            if( index == 0 ) isOpen[index] = true ;
                                                            item.forEach( function( n , i){
                                                                currentCodes.forEach( function( m ) {
                                                                    if(n.code == m){
                                                                        n.checked = true;
                                                                        return ;
                                                                    }
                                                                })
                                                            })
                                                            index ++ ;
                                                        }
                                                        $scope.codeInfos = codes ;
                                                        $scope.isOpen = isOpen ;
                                                    }
                                                    else{
                                                        utils.message( res.msg );
                                                    }
                                                });
                                            }
                                            else{
                                                $scope.indexController = [] ;
                                            }
                                        }

                                        if(res.code == 0) {
                                            codes = res.data;
                                            setCodes( codes );
                                        }

                                        if( !codes ){
                                            roles.getOutCodes(name).success(function(resOut){
                                                if(resOut.code == 0) {
                                                    codes = resOut.body;
                                                    setCodes( codes );
                                                }
                                                else{
                                                   utils.message( res.msg );
                                                }
                                            })
                                            //utils.message( res.msg );
                                        }
                                    });
                                }
                                $scope.getCodes( res.data[0]  , 0 );
                            }
                            else{
                                utils.message( res.msg );
                            }

                        });
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    }],
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    size: 'lg'
                });
            };


            $scope.remove = function(){
                if(confirm("是否要删除？"))
                //var item = this.item ;
                    roles.remove( this.item.id ).success(function( res ){
                        if( res.code == 0){
                            /* var elem = utils.findById( $scope.list , item.id );
                             if( elem ){
                             $scope.list.splice( $scope.list.indexOf( elem )  , 1) ;
                             }*/
                            $state.reload();
                        }
                        else{
                            utils.message( data.msg );
                        }
                    }).error(function(){
                        utils.message('删除失败！');
                    })
            }



        }])
    /*   .directive('onFinishRenderFilters', function ($timeout) {
     return {
     restrict: 'A',
     link: function(scope, element, attr) {
     if (scope.$last === true) {
     $timeout(function() {
     scope.$emit('ngPaginationFinished');
     });
     }
     }
     }})*/
    .controller('controller.modal.instance', [
        "$scope", "$rootScope" ,"$modalInstance" ,"item" , "roles" , "$state" , "currentPage" ,
        function ( $scope, $rootScope ,$modalInstance ,item , roles , $state , currentPage ) {
            $scope.item = item;
            $scope.ok = function () {
                // $modalInstance.close($scope.selected.item);
                if( item )
                    roles.update(  $scope.item ).success(function( res ){
                        if( res.code == 0 ){
                            $modalInstance.dismiss('cancel');
                            //  $state.go($state.current.name , { currentPage :  $rootScope.rootCurrentPage , searchName :  $rootScope.searchData.name });
                        }
                        else{
                            utils.message( res.msg );
                        }
                    }).error(function(){
                        utils.message('修改失败！');
                    })
                else
                    roles.add( $scope.item ).success(function( res ){
                        if( res.code == 0 ){
                            $modalInstance.dismiss('cancel');
                            if( currentPage == 0 )
                                $state.reload();
                            else
                                $state.go($state.current.name , { currentPage : 0 , searchName : '' });
                        }
                        else{
                            utils.message( res.msg );
                        }
                    }).error(function(){
                        utils.message('添加失败！');
                    })
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }])
