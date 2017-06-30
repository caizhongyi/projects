// router Provider
angular.module('app.router', ['ui.router', 'oc.lazyLoad']).provider('route', ['$stateProvider', function ($stateProvider) {
    var self = this, filePath = appDev ? 'app/' : 'dist/app/';

    this.manager = {
        "mbs": {
            items: [
                {
                    sref: 'mbs-index-home',
                    options: {
                        page: {title: '首页'},
                        query: "?appId&type&token"
                    }
                },
                {
                    sref: 'mbs-security-index',
                    options: {
                        page: {title: '登录'},
                        files: ['index'],
                        query: "?appid&type&token"
                    }
                }
            ]
        },
        "acl": {
            items: [
                {
                    sref: 'acl-access-index',
                    options: {page: {title: '访问权限'}}
                },
                {
                    sref: 'acl-index-getrolelist',
                    options: {
                        page: {title: '权限管理'},
                        files: ['service', 'index'],
                        query: "/:currentPage?searchName"
                    }
                }
            ]
        },
        "user": {
            common: [],
            items: [
                {
                    sref: 'user-user-index',
                    options: {
                        page: {title: '用户中心'},
                        files: ['service', 'directive', 'index', 'filter'],
                        query: "/:currentPage?name&telephone&status$from_type"
                    }
                },
                {
                    sref: 'user-dept-index',
                    options: {
                        files: ['service', 'directive', 'index', 'filter'],
                        page: {title: '部门管理'},
                        query: "/:currentPage"
                    }
                },
                {
                    sref: 'user-car-recom',
                    options: {
                        files: ['service', 'index', 'filter'],
                        page: {title: '车人脉'},
                        query: "/:currentPage?city_id&account&keyword&min_create&max_create"
                    }
                }
            ]
        },

        "trade": {
            items: [
                {
                    sref: 'trade-index-index',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '交易列表'},
                        query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
                    }
                },
                {
                    sref: 'trade-index-edittradedetail',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '交易详情'},
                        query: "/:id"
                    }
                }
            ]
        },
        "settlement": {
            common: ["service", "directive", "filter"],
            items: [
                {
                    sref: 'settlement-order-orderList',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '订单管理'},
                        query: "/:currentPage?start_date&end_date&order_no&car_number&contract_no&status&province&city&dept&id&appId&type&token&payee_realname"
                    }
                }, {
                    sref: 'settlement-order-addOrder',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '订单添加'},
                        query: ""
                    }
                }, {
                    sref: 'settlement-order-editOrder',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '订单修改'},
                        query: "/:order_no?type"
                    }
                }, {
                    sref: 'settlement-apply-applyList',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '支付列表'},
                        query: "/:currentPage?start_date&end_date&car_number&contract_no&order_no&status&province&city&dept&fee_type"
                    }
                }, {
                    sref: 'settlement-deptAccountTransferDetail-index',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '刷卡明细'},
                        query: "/:currentPage?order_no&car_number&pay_bank&start_date&end_date&card_type&province&city&dept"
                    }
                }, {
                    sref: 'settlement-apply-applyFee',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '车款'},
                        query: "/:order_no"
                    }
                }, {
                    sref: 'settlement-apply-applyInfo',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '支付审核'},
                        query: "/:id?preview"
                    }
                }, {
                    sref: 'settlement-apply-refund',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '退款'},
                        query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
                    }
                }, {
                    sref: 'settlement-apply-refundApply',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '合同退款'},
                        query: "/:order_no"
                    }
                }, {
                    sref: 'settlement-apply-refundOrder',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '订单退款'},
                        query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
                    }
                }, {
                    sref: 'settlement-finance-index',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '财务放款'},
                        query: "/:currentPage?start_date&end_date&order_no&car_number&contract_no&fee_type&pay_status&province&city&dept&pay_bank"
                    }
                }, {
                    sref: 'settlement-finance-pay',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '财务支付'},
                        query: "/:currentPage?ids"
                    }
                }, {
                    sref: 'settlement-deptAccount-getDeptAccountList',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '门店管理'},
                        query: "/:currentPage?province&city&dept_id&status&pos_receiving_bank"
                    }
                }, {
                    sref: 'settlement-deptAccount-updateDeptAccount',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '门店账户信息'},
                        query: "/:id"
                    }
                }, {
                    sref: 'settlement-deptAccountDepositApply-getDeptAccountDepositApplyList',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '预存款复核'},
                        query: "/:currentPage?start_date1&end_date1&start_date2&end_date2&fee1&fee2&province&city&dept_id"
                    }
                }, {
                    sref: 'settlement-reportDept-reportDeptAccount',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '刷卡手续费汇总表'},
                        query: "/:currentPage?start_date&end_date&province&city&dept_id"
                    }
                }, {
                    sref: 'settlement-reportSwiping-swingList',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '刷卡流水到账表'},
                        query: "?start_date&end_date&province&city&dept_id&bank&pay_channel"
                    }
                }, {
                    sref: 'settlement-reportSwiping-swipingList',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '刷卡流水表'},
                        query: "?start_date&end_date&province&city&dept_id&bank&pay_channel"
                    }
                }, {
                    sref: 'settlement-reportSwiping-advancePay',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '垫款金额'},
                        query: "?province&city&dept_id"
                    }
                }, {
                    sref: 'settlement-reportSwiping-unpayList',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '未付款金额'},
                        query: "?province&city&dept_id"
                    }
                }, {
                    sref: 'settlement-reportDept-reportDeptDetail',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '刷卡手续费流水表'},
                        query: "/:currentPage?start_date&end_date&source_type&province&city&dept_id"
                    }
                }, {
                    sref: 'settlement-deptAccount-getDeptAccountDetail',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '刷卡手续费'},
                        query: "/:currentPage?start_date&end_date&source_type&province&city&dept_id"
                    }
                }, {
                    sref: 'settlement-reportDept-reportDeptOrder',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '刷卡手续费汇总表(按订单)'},
                        query: "/:currentPage?start_date&end_date&source_type&order_no"
                    }
                }, {
                    sref: 'settlement-deptAccountRefundApply-getDeptAccountRefundApplyList',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '退款复核'},
                        query: "/:currentPage?province&city&dept_id"
                    }
                }, {
                    sref: 'settlement-contract-contractList',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '合同'},
                        query: "/:currentPage?start_date&end_date&order_no&car_number&contract_no&status&province&city&dept&id"
                    }
                }, {
                    sref: 'settlement-statement-getStatementList',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '资金对账'},
                        query: "/:currentPage?start_date&end_date&start_confirm_date&end_confirm_date&receiving_bak"
                    }
                }, {
                    sref: 'settlement-statement-detail',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '对账明细'},
                        query: "/:currentPage?channel&settlement_date&merchant_id"
                    }
                }, {
                    sref: 'settlement-contract-getContractByOrderNo',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '合同详情'},
                        query: "/:order_no"
                    }
                }, {
                    sref: 'settlement-contract-addContract',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '完善合同'},
                        query: "/:order_no"
                    }
                }, {
                    sref: 'settlement-contract-horizontal',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '合同审核'},
                        query: "/:currentPage?order_no"
                    }
                }, {
                    sref: 'settlement-contract-update',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '已完善合同'},
                        query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
                    }
                }, {
                    sref: 'settlement-contract-vertical',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '合同审核'},
                        query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
                    }
                }, {
                    sref: 'settlement-contract-step1',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '完善合同'},
                        query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
                    }
                }, {
                    sref: 'settlement-contract-step3',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '完善合同'},
                        query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
                    }
                }, {
                    sref: 'settlement-contract-step4',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '完善合同'},
                        query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
                    }
                }, {
                    sref: 'settlement-contract-step2',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '完善合同'},
                        query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
                    }
                }, {
                    sref: 'settlement-incomeExpenses-detail',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '各款项收支流水表'},
                        query: "/:currentPage?start_date&end_date&province&city&dept_id&pay_bank&pay_channel&order_no"
                    }
                }, {
                    sref: 'settlement-reportHandingFee-reportList',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '门店刷卡手续费收入'},
                        query: "/:currentPage?dept_type&status&start_date&end_date&dept_id&province&city"
                    }
                }, {
                    sref: 'settlement-trade-index',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '交易管理'},
                        query: "/:currentPage?start_date&end_date&entry_user&car_number&contract_no"
                    }
                }, {
                    sref: 'settlement-trade-edit',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '交易详情'},
                        query: "/:id"
                    }
                }
            ]
        },
        /* ---------------------- 过户模块 -----------------------------*/
        "change": {
            items: [
                {
                    sref: 'change-user-index',
                    options: {
                        files: ['service', 'index', 'filter'],
                        page: {title: '微信用户管理'},
                        query: "/:currentPage?real_name&username&telphone&giste_type"
                    }
                },
                {
                    sref: 'change-businfo-index',
                    options: {
                        files: ['service', 'index', 'filter'],
                        page: {title: '订单车辆信息查询'},
                        query: "/:currentPage?&city&province&car_number&vin&car_type"
                    }
                },
                {
                    sref: 'change-city-index',
                    options: {
                        files: ['service', 'index', 'filter'],
                        page: {title: '过户城市相关信息配置'},
                        query: "/:currentPage?&city&province"
                    }
                },
                {
                    sref: 'change-feeback-index',
                    options: {
                        files: ['service', 'index', 'filter'],
                        page: {title: '用户反馈查询'},
                        query: "/:currentPage?min_create&max_create"
                    }
                },
                {
                    sref: 'change-appraise-index',
                    options: {
                        files: ['service', 'index', 'filter'],
                        page: {title: '用户评价查询'},
                        query: "/:currentPage?min_create&max_create"
                    }
                },
                {
                    sref: 'change-order-index',
                    options: {
                        files: ['service', 'index', 'filter'],
                        page: {title: '订单管理查询'},
                        query: "/:currentPage?min_create&max_create&min_pay&max_pay&order_id&order_status&change_user&min_money&max_money"
                    }
                },
                {
                    sref: 'change-product-index',
                    options: {
                        files: ['service', 'index', 'filter'],
                        page: {title: '过户费用基础配置管理'},
                        query: "/:currentPage?city&province"
                    }
                },
                {
                    sref: 'change-carfee-index',
                    options: {
                        files: ['service', 'index', 'filter'],
                        page: {title: '车辆类型配置管理'},
                        query: "/:currentPage?city&province"
                    }
                },
                {
                    sref: 'change-trade-index',
                    options: {
                        files: ['service', 'index', 'filter'],
                        page: {title: '交易人员系统管理'},
                        query: "/:currentPage?min_create&max_create&order_id&car_number"
                    }
                },
                {
                    sref: 'change-picture-index',
                    options: {
                        files: ['service', 'index', 'filter'],
                        page: {title: '过户材料管理'},
                        query: "/:currentPage?min_create&max_create&order_id&car_number"
                    }
                }


            ]
        },

        "basicservice" :  {
            items : [
                {
                    sref : 'basicservice-User-userInfo',
                    options : {
                        files:  ['service','index', 'filter'],
                        page: {title: '账户管理'},
                        query: "/:currentPage?account&account_code&status"
                    }
                },
                {
                    sref : 'basicservice-App-typeInfo',
                    options : {
                        files: ['service','index', 'filter'],
                        page: {title: '应用类型'},
                        query: "/:currentPage?app&status"
                    }
                },
                {
                    sref : 'basicservice-App-addType',
                    options : {
                        files: ['service','index'],
                        page: {title: '新增类型'},
                        query: "/:currentPage?app&status"
                    }
                },
                {
                    sref : 'basicservice-App-editType',
                    options : {
                        files: ['service','index'],
                        page: {title: '修改类型'},
                        query: "/:currentPage?id"
                    }
                },
                {
                    sref : 'basicservice-App-appInfo',
                    options : {
                        files: ['service','index','filter'],
                        page: {title: '应用管理'},
                        query: "/:currentPage?app&status&apptype"
                    }
                },
                {
                    sref : 'basicservice-App-addApp',
                    options : {
                        files: ['service','index', 'filter'],
                        page: {title: '新增应用'},
                        query: "/:currentPage"
                    }
                },
                {
                    sref : 'basicservice-App-editApp',
                    options : {
                        files: ['service','index', 'filter'],
                        page: {title: '修改应用'},
                        query: "/:currentPage?id"
                    }
                },
                {
                    sref : 'basicservice-VinSearch-getRecordList',
                    options : {
                        files: ['service','index','filter'],
                        page: {title: '车鉴定管理'},
                        query: "/:currentPage?&username&vin&status&start_date&end_date"
                    }
                },
                {
                    sref : 'basicservice-Token-tokenInfo',
                    options : {
                        files: ['service','index'],
                        page: {title: '应用授权管理'},
                        query: "/:currentPage"
                    }
                },
                {
                    sref : 'basicservice-Work-addWork',
                    options : {
                        files: ['service','index','directive'],
                        page: {title: '新增工单'},
                        query: ""
                    }
                },
                {
                    sref : 'basicservice-Work-workList',
                    options : {
                        files: ['service','index','filter'],
                        page: {title: '工单列表'},
                        query: "/:currentPage?solver&asker&status&work_type&start_date&end_date"
                    }
                },
                {
                    sref : 'basicservice-Work-workDetail',
                    options : {
                        files: ['service','index','filter'],
                        page: {title: '工单详情'},
                        query: "?id"
                    }
                },
                {
                    sref : 'basicservice-Work-workType',
                    options : {
                        files: ['service','index'],
                        page: {title: '问题分类'},
                        query: "/:currentPage"
                    }
                },
                {
                    sref : 'basicservice-Transfer-transferList',
                    options : {
                        files: ['service','index','filter','directive'],
                        page: {title: '转接查询'},
                        query: "/:currentPage?caller&called&forward_extno&sale_id&hangup_cause&trunk&start_date&end_date&follow_user_id&user&is_sync"
                    }
                },
                {
                    sref : 'basicservice-Msg-msgList',
                    options : {
                        files: ['service','index','filter'],
                        page: {title: '短信查询'},
                        query: "/:currentPage?channel&status&mobile&content&start_date&end_date&app&radio_date"
                    }
                },
                {
                    sref : 'basicservice-Msg-countList',
                    options : {
                        files: ['service','index','filter'],
                        page: {title: '短信用量'},
                        query: "/:currentPage?channel&status&mobile&content&start_date&end_date"
                    }
                },
                {
                    sref : 'basicservice-ShortUrl-index',
                    options : {
                        files:  ['service','index'],
                        page: {title: '短地址管理'},
                        query: "/:currentPage?start_date&end_date&submit_account&account_code&app"
                    }
                }
            ]
        },

        /**    收付核心      **/
        "chefubao": {
            common: ["service", "directive", "filter"],
            items: [
                {
                    sref: 'chefubao-simulation-request',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '订单管理'},
                        query: "/:currentPage?"
                    }
                }
            ]
        },
        /**  巨好车    **/
        "contract": {
            common: ["service", "directive", "filter"],
            items: [
                {
                    sref: 'contract-contract-contractList',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '合同管理'},
                        query: "/:currentPage?sale_price_1&sale_price_2&brokerage_1&brokerage_2&start_date&end_date&is_juhaoche&contract_no&car_number&status&dept_id&province&city"
                    }
                }, {
                    sref: 'contract-contract-addContract',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '添加合同'},
                        query: "/:id"
                    }
                },{
                    sref: 'contract-contract-printShow',
                    options: {
                        files: ['service', 'index'],
                        page: {title: '合同预览'},
                        query: "/:id"
                    }
                },

            ]
        },
        // 包含mongo日志
        "log" : {
            items : [
                {
                    sref: 'log-mongo-index',
                    options: {
                        page: {title: 'mongo日志'},
                        files: ['service', 'index'],
                        query: "/:currentPage?db&collectioin&identity"
                    }
                }
            ]
        }
    };

    this.state = function (sref, options) {
        var random = appVersion;
        var defaults = {
            page: {
                title: '',
                desc: '',
                key: '',
                content: ''
            },
            query: '',
            url: null,
            controller: 'controller.' + sref.replace(/-/g, '.'),
            files: ['index'],
            utilsFiles: [],
            resolve: {},
            templateUrl: null
        }

        options = angular.extend({}, defaults, options);

        options.url = options.url || '/' + sref.replace(/-/g, '/');

        function path(sref) {
            return sref.replace(/\./g, '/').replace(/-/g, '/');
        }

        options.resolve.lazyload = ["$ocLazyLoad", function ($ocLazyLoad) {
            var files = [];

            function getFileUrl(file) {
                var url = '';
                if (file.indexOf('.js') == -1) {
                    file = file + '.js';
                    url = filePath + path(sref) + '/' + file + random;
                }
                else {
                    url = file + random;
                }
                return url;
            }

            angular.forEach(options.utilsFiles, function (n, i) {
                var url = '', file = n, modelName = path(sref).split('/')[0];
                if (file.indexOf('.js') == -1) {
                    file = file + '.js';
                    url = filePath + modelName + '/utils/' + file + random;
                }
                else {
                    url = file + random;
                }
                this.push(url);
            }, files);

            angular.forEach(options.files, function (n, i) {
                this.push(getFileUrl(n));
            }, files);

            return $ocLazyLoad.load({
                cache: !angular.debug,
                // serie: true,
                name: sref,  //module
                files: files
            })
        }]
        options.templateUrl = options.templateUrl || filePath + path(sref) + '/index.html' + random;
        options.url += options.query;
        $stateProvider.state(sref, options);
    }
    this.stateSub = function (sref, options) {
        var s = sref.split('.'), root = filePath + s[0].replace(/-/g, '/') + '/';
        var defaults = {
            url: '/' + s[1],
            templateUrl: root + s[1] + '.html' + appVersion,
            controller: 'controller.' + s[0].replace(/-/g, '.'),
            files: [root + 'service.js' + appVersion, root + 'index.js' + appVersion]
        }
        self.state(sref, angular.extend({}, defaults, options));
    }

    this.init = function () {
        angular.forEach(self.manager, function (n, i) {
            n.items.forEach(function (m, j) {
                m.options.utilsFiles = n.common;
                self.state(m.sref, m.options);
            })
        })
    }

    this.$get = function () { // injectables go here
        var service = {};
        return service;
    }
}]);