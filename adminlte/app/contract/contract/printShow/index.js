angular.module('contract.contract.printShow', [
    'contract.contract.printShow.service',
    'utils.service'
])
    .controller('controller.contract.contract.printShow',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "printShow" ,"utils","fileupload","$sce",
        function ($scope, $rootScope, $stateParams, $modal, $state,  printShow , utils , fileupload ,$sce) {

            printShow.get( $stateParams.id ).success(function( res ){
                if (res.code == 0) {
                    $scope.item = res.data;
                    $scope.item.delivery_items_name = $sce.trustAsHtml(res.data.delivery_items_name);
                } else {
                    utils.message(res.msg);
                }
            }).error(function () {
                utils.message('读取失败！');
            })
            $scope.showPrintInstall = function( LODOP ) {
                $modal.open({
                    templateUrl: "tpl-print.html",
                    controller: ["$scope","$rootScope","$modalInstance" ,function ($scope,$rootScope,$modalInstance ) {
                        try{

                            if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) {
                                if (navigator.userAgent.indexOf('Firefox')>=0)
                                    $scope.showFireFox=1;
                                if (navigator.userAgent.indexOf('Win64')>=0){
                                    $scope.showInstall64=1;
                                } else {
                                    $scope.showInstall=1;
                                }
                            } else if (LODOP.VERSION<"6.1.9.8") {
                                if (navigator.userAgent.indexOf('Win64')>=0){
                                    $scope.showUpdate64=1;
                                } else {
                                    $scope.showUpdate=1;
                                }
                            }
                        }catch(err){
                            if (navigator.userAgent.indexOf('Win64')>=0) {
                                $scope.showInstall64 = 1;
                            } else {
                                $scope.showInstall = 1;
                            }
                        }
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    }]
                });
            };
            $scope.showPrint = function() {
                var LODOP=document.getElementById('LODOP_EM');
                if (navigator.appVersion.indexOf("MSIE")>=0)
                    LODOP=document.getElementById('LODOP_OB');
                if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined") || LODOP.VERSION<"6.1.9.8") {
                    this.showPrintInstall(LODOP);
                    return;
                }
                LODOP.PRINT_INIT("273二手车交易合同");
                LODOP.NewPage();
                LODOP.SET_PRINT_PAGESIZE(1, 0, 0,'A4');
                LODOP.ADD_PRINT_HTM(20,40,'90%','1280',document.getElementById("contain").innerHTML);
                LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT",'Auto-Width');

                printShow.updateNo($scope.item.id);
                printShow.updatePrintTimes($scope.item.id);
                LODOP.SET_SHOW_MODE("NP_NO_RESULT",true);

                LODOP.PREVIEW();
            };
        }])

