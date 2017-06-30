//form,兼容thinkphp后端验证
define(function(require, exports, module) {
    //加载jquery
    var $ = require('jquery');

    var form = {
        'EXISTS_VALIDATE' : 0, // 存在验证
        'MUST_VALIDATE' : 1, // 必须验证
        'VALUE_VALIDATE' : 2 // 值不为空验证
    };

    $.fn.formValidate = function(options) {
        //合并默认配置
        options || ( options = {});
        options = $.extend($.fn.formValidate.defaults, options);

        this.each(function() {
            init($(this), options);
        });
    };

    $.fn.formValidate.defaults = {
        submit : undefined,
        fieldError : true,
        fieldSuccess : true
    };

    //初始化
    function init($element, options) {
        var validateString = $element.attr('validatejson');
        console.log(validateString);
        var validateArr = $.parseJSON(validateString);
        console.log(validateArr);
        $element.on('submit', function() {//提交时触发
            return submitForm($element, validateArr, options);
        });
        if (options.fieldError) {
            $element.on('fieldError', function(e, name, content) {//单个验证错误时触发
                fieldError.apply(this, arguments);
            });
        }
        if (options.fieldSuccess) {
            $element.on('fieldSuccess', function(e, name, content) {//单个成功时触发
                fieldSuccess.apply(this, arguments);
            });
        }

        if ( validateArr instanceof Array) {
            for (var key in validateArr) {
                (function(arr){//加一层闭包，原因:循环时响应函数内并未能保存对应的值,会取循环的最后一个值
                    console.log('validateArr for : ' + arr[0]);
                    if ( arr instanceof Array) {
                        $element.find("[name='" + arr[0] + "']").on('focus',{arr, arr}, function(e) {
                            triggerEvent('fieldFocus', $element, e.data.arr);
                        }).on('blur', function() {
                            var value = $element.find("[name='" + arr[0] + "']").val();
                            if (!validate($element, arr, value)) {
                                triggerEvent('fieldError', $element, arr);
                            } else {
                                triggerEvent('fieldSuccess', $element, arr);
                            }
                            triggerEvent('fieldBlur', $element, arr);
                        });
                    }
                })(validateArr[key]);
            }
        }
    }

    function submitForm($element, validateArr, options) {
        var errors = [];
        if (validateArr instanceof Array) {
            for (var key in validateArr) {
                (function(arr){//加一层闭包，原因:循环时响应函数内并未能保存对应的值,会取循环的最后一个值
                    if (arr instanceof Array) {
                        var value = $element.find("[name='" + arr[0] + "']").val();
                        if (value == undefined && arr[3] != form.EXISTS_VALIDATE) {
                            alert('未找到 ' + arr[0] + '字段');
                            return false;
                        }
                        if (!validate($element, arr, value)) {
                            triggerEvent('fieldError', $element, arr);
                            errors.push(arr);
                        } else {
                            triggerEvent('fieldSuccess', $element, arr);
                        }
                    }
                })(validateArr[key]);
            }
            if (errors.length > 0) {//当有错误时,触发事件
                $element.trigger('allError', errors);
                return false;
            }
            if (options.submit !== undefined) {
                var $return = options.submit.apply(this, validateArr);
                return (!$return) ? false : true;
            }
            return false;
        }
    }

    function triggerEvent(eventName, $element, arr) {
        $element.trigger(eventName, [arr[0], arr]);
    }

    //单个字段验证失败的默认处理
    function fieldError(event, fieldName, item) {
        //@todo 验证失败实现
        console.log('fieldError:' + fieldName);
    }

    //单个字段验证成功的默认处理
    function fieldSuccess(event, fieldName, item) {
        //@todo 验证成功实现
        console.log('fieldSuccess:' + fieldName);
    }

    //验证各字段
    function validate($element, arr, value) {
        //判断是否存在3索引 tp默认为 EXISTS_VALIDATE 即 存在字段就验证
        if (value === undefined && (arr[3] === undefined || arr[3] === form.EXISTS_VALIDATE)) {
            // 该情况前端js不需要做处理
            return true;
        }
        // 不为空验证的时候 值为空 则不做验证
        if (arr[3] === form.VALUE_VALIDATE && $.trim(value) == '') {
            console.log(arr[0] + '值为空， 不进行验证');
            return true;
        }

        // 默认为正则表达式
        var style = !arr[4] ? 'regex' : arr[4];
        switch (style) {
            case 'function':
            case 'callback':
                console.log(arr[0] + 'function，callback类型的验证，直接默认通过，后端进行验证');
                return true;
                break;
            case 'confirm':
                var name1 = $element.find("[name='" + arr[0] + "']").val();
                var name2 = $element.find("[name='" + arr[1] + "']").val();
                return $.trim(name1) == $.trim(name2);
                break;

            case 'equal':
            case 'notequal':
                return (style == 'equal') ? arr[1] == value : arr[1] != value;
                break;

            case 'in':
            case 'notin':
                if (arr[1] instanceof Array) {
                    var isInArray = false;
                    for (var key in arr[1])  {
                        if (arr[1][key] == value) {
                            isInArray = true;
                            break;
                        }
                    }
                    return (style == 'notin') ? isInArray == false : isInArray == true;
                }
                break;

            case 'length':
                valueArr = arr[1].split(',');
                if (valueArr.length == 2) {
                    var min = valueArr[0];
                    var max = valueArr[1];
                    return value.length >= min && value.length <= max;
                } else {
					return value.length == valueArr;
                }
                break;

            case 'between':
            case 'notbetween':
                if (arr[1] instanceof Array) {
                    var isBetween = false;
					var min = arr[1][0];
					var max = arr[1][1];

                    if (value >= min && value <= max) {
                        isBetween = true;
                    }
                    return (style == 'between') ? isBetween == true : isBetween == false;
                }
                break;

            case 'expire':
                break;
            case 'ip_allow':
                break;
            case 'ip_deny':
                break;
            case 'unique':
                break;

            case 'regex':
            default :
                var regexString = '';
                switch (arr[1]) {
                    case 'require':
                        regexString = /\S+/;
                        break;
                    case 'email':
                        regexString = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                        break;
                    case 'url':
                        regexString = /^http(s?):\/\/(?:[A-za-z0-9-]+\.)+[A-za-z]{2,4}(:\d+)?(?:[\/\?#][\/=\?%\-&~`@[\]\':+!\.#\w]*)?$/;
                        break;
                    case 'currency':
                        regexString = /^\d+(\.\d+)?$/;
                        break;
                    case 'number':
                        regexString = /^\d+$/;
                        break;
                    case 'zip':
                        regexString = /^\d{6}$/;
                        break;
                    case 'integer':
                        regexString = /^[-\+]?\d+$/;
                        break;
                    case 'double':
                        regexString = /^[-\+]?\d+(\.\d+)?$/;
                        break;
                    case 'english':
                        regexString = /^[A-Za-z]+$/;
                        break;
                    default :
                        regexString = eval(arr[1]);
                        break;
                }
                var re = new RegExp(regexString);
                return re.test(value);
                break;
        }
    }

});
