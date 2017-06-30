/**
 * Created by DTO on 2015/4/27.
 * ?
 */
angular.module('settlement.deptAccountTransferDetail.index', [
    'settlement.deptAccountTransferDetail.index.service'
]).controller('controller.settlement.deptAccountTransferDetail.index',
    ["$scope", "$rootScope", "$stateParams", "$modal", "$state",  "transferDetail","utils" ,"fileupload",
        function ($scope, $rootScope, $stateParams, $modal, $state, transferDetail,utils, fileupload) {
            $scope.transferDetail = transferDetail;
            $scope.utils = utils;
            $scope.showExcel = function(){
                
				if(!$scope.searchCondition.start_date || !$scope.searchCondition.end_date){
					alert('开始时间和结束时间都不能为空');
					return;
				}
				if((new Date($scope.searchCondition.end_date).getTime()/1000) - (new         Date($scope.searchCondition.start_date).getTime()/1000) >86400*30){
					alert('时间间隔不能超过30天');
					return;
				}
				transferDetail.excel($scope.searchCondition);
            }

            $scope.contractInfo = function(){
                $state.go('settlement-contract-getContractByOrderNo',{ order_no : this.item.order_no });
            }
        /*    $scope.showSign = function() {
                var item = this.item;
                $modal.open({
                //    templateUrl: "tpl-sign-info.html",
                    template : '  <div class="modal-header">\
                        <button aria-label="Close" data-dismiss="modal" class="close" type="button" ng-click="cancel()"><span aria-hidden="true">×</span></button>\
                        <h3 class="modal-title">查看签购单</h3>\
                        </div>\
                        <div class="modal-body">\
                        <span class="btn btn-primary btn-file modv2-btn" ngf-select ngf-drop ng-model="signImg" ng-model-rejected="rejFiles"\
                        ngf-multiple="false" ngf-accept="accept" accept="image/!*"\
                        ng-disabled="disabled" ngf-capture="capture"\
                        ngf-drag-over-class="{accept:\'dragover\', reject:\'dragover-err\', delay:100}"\
                        ngf-min-size="minSize" ngf-max-size="maxSize"\
                        ngf-keep="false" ngf-keep-distinct="true"\
                        ngf-reset-model-on-click="resetModelOnClick"\
                        ngf-allow-dir="allowDir" class="drop-box" ngf-drop-available="dropAvailable" ng-show="!item.sign_url">上传照片</span>\
                        <img ng-show="item.sign_url" width="400" src="{{item.sign_url}}" />\
                        </div>\
                        <div class="modal-footer">\
                        <button class="btn btn-primary modv2-btn" ng-click="cancel()">确定</button>\
                        </div>',
                    resolve: {
                        item: function () {
                            return item;
                        }
                    },
                    size: 'md',
                    controller: ["$scope", "$rootScope", "$modalInstance", "item", "$state", "$sce", function ($scope, $rootScope, $modalInstance, item, $state, $sce) {
                        $scope.item = item;
                        $scope.item.autopay_note = $sce.trustAsHtml($scope.item.autopay_note);
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        }

                        $scope.$watch('signImg', function (files) {
                            fileupload.upload(files, function( file, res ){
                                //console.log(file,res);
                                deptAccountTransferDetail.updateSignImg({order_no : $scope.item.order_no, voucher_no : $scope.item.voucher_no , sign_url : res.data.org_url}).success(function(){
                                    $scope.item.sign_url = res.data.org_url;
                                });
                            });
                        });
                    }]

                });
            }*/



            $scope.setFee = function(){
				if(confirm("是否要扣除？")) {
					var item = this.item;
					transferDetail.deptAccountTransferDetail({id: this.item.id, is_free_handling_fee: 0 }).success(function (res) {
						if (res.code == 0) {
							utils.message(res.msg || res.message || '扣除成功！');
							$state.reload();
						}
					}).error(function () {
						utils.message('服务器无响应！');
					})
				}
			}

            $scope.$watch("searchCondition.start_date",function(val){
                if(val && !$scope.searchCondition.end_date){
                    var time = $scope.searchCondition.start_date.split('-');
                    var new_year = time[0];
                    var new_month = time[1]++;
                    if(new_month>12) {
                        new_month -=12;
                        new_year++;
                    }
                    var new_date = new Date(new_year,new_month,1);
                    var lastDay = (new Date(new_date.getTime()-1000*60*60*24)).getDate();
                    $scope.searchCondition.end_date = new_year + '-' + new_month + '-' + lastDay;
                }
            })
        }
    ]);

