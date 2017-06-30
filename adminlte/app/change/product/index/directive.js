angular.module('change.product.index.directive',['ngMessages'])
    .directive("telephoneAvailableValidator", function($http, MBS_DOMAIN, $q) {
        return {
            require : 'ngModel',
            link : function(scope, element, attrs, ngModel) {
                // 异步调用 等待其他验证通过才执行该代码
                ngModel.$asyncValidators.telephoneAvailable1 = function(telephone) {
                    return $http.get(MBS_DOMAIN + '/User/Users/checkUniqueTelephone/token/1/telephone/' + telephone).
                        then(function resolved(result) {
                            var res = result.data;
                            if (res.code == 0) {
                                if (res.data) {
                                    // 手机号码已经存在， 验证失败， 给下一个promise传递失败通知
                                    return $q.reject('res.data');
                                } else {
                                    return true;  // 手机号码不存在 验证成功
                                }
                            }
                        });
                };
            }
        }
    });