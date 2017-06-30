var Class = window.Class ||  require('class') ;
var $ = window.jQuery ||  require('jquery');


/**
 * 验证角色
 * @params name {string} 角色名称
 * @params operator {string|object} 配置  regexp 或 function
 * @return object
 * */

// Rule class
var Rule = Class.create({
    initialize: function( name, operator ) {
        this.name = name || Rule.unique();

        if (operator instanceof RegExp) {

            this.validate = function (options) {

                var defer = $.Deferred();
                var result = operator.test(options.value);

                var action = result ? 'resolve' : 'reject';
                var errorMessage = ~~options.not ^ ~~result ? undefined : options.errorMessage || '';


                defer[action](errorMessage);

                return defer;
            }
        } else if ($.isFunction(operator)) {

            this.validate = function (options) {

                var defer = $.Deferred();
                var result = operator.call(this, options, defer);

                // 返回defer对象
                if ($.isPlainObject(result)) {

                    result.done(function () {

                        defer.resolve();
                    }).fail(function (msg) {

                        defer.reject(msg);
                    });
                }
                // 异步验证返回undefined
                else if (result !== undefined) {

                    var action = result ? 'resolve' : 'reject';
                    var errorMessage = ~~options.not ^ ~~result ? undefined : options.errorMessage || '';

                    defer[action](errorMessage);
                }

                return defer;
            }
        }

    },
    /**
     * @description 增加条件
     * */
    and : function (name, options) {

        var target = name instanceof Rule ? name : Rule.getRule(name, options);

        if (!target) return null;

        var self = this;

        return new Rule(null, function (opts) {

            var defer = $.Deferred();

            self.validate(opts).done(function () {
                target.validate(opts).done(function () {
                    defer.resolve();
                }).fail(function (msg) {
                    defer.reject(msg);
                });
            }).fail(function (msg) {
                defer.reject(msg);
            });
            return defer;
        });
    },
    /**
     * @description 增加或条件
     * */
    or : function (name, options) {

        var target = name instanceof Rule ? name : Rule.getRule(name, options);

        if (!target) return null;

        var self = this;

        return new Rule(null, function (opts) {

            var defer = $.Deferred();

            self.validate(opts).done(function () {
                defer.resolve();
            }).fail(function () {
                target.validate(opts).done(function () {
                    defer.resolve();
                }).fail(function (msg) {
                    defer.reject(msg);
                });
            });
            return defer;
        });
    },
    not : function (options) {

        var target = Rule.getRule(this.name, options);

        if (!target) return null;

        return new Rule(null, function (opts) {

            var defer = $.Deferred();

            // 非
            opts.not = true;

            target.validate(opts).done(function (msg) {
                defer.reject(msg);
            }).fail(function () {
                defer.resolve();
            });
            return defer;
        });
    }
})

// 规则列表
Rule.rules = {};
Rule.count = 0;
Rule.unique = function () {
    return '__anonymous__' + Rule.count++;
};

// 获取规则或者规则实例
Rule.getRule = function (name, options) {

    if (name === undefined) {
        return Rule.rules;
    }

    var rule = Rule.rules[name] || null;

    if (rule && options && !$.isEmptyObject(options)) {

        return new Rule(null, function (opts) {

            return rule.validate($.extend(opts, options));
        });
    }

    return rule;
};


// 添加规则
Rule.addRule = function (name, operator) {

    if ($.isPlainObject(name)) {

        $.each(name, function (i, v) {
            if ($.isArray(v)) {
                Rule.addRule(i, v[0], v[1]);
            } else {
                Rule.addRule(i, v);
            }
        });
        return this;
    }

    var rule;
    if (operator instanceof Rule) {

        rule = new Rule(name, operator.validate);
    } else {
        rule = new Rule(name, operator);
    }

    if (rule) {

        name = rule.name;
        Rule.rules[name] = rule;
    }
    return name;
};

Rule._formatValue = function (value, type) {

    if ((type === 'length' && typeof value === 'string' )|| (type === 'count' && $.isArray(value))) {
        value = value.length;
    } else {
        value = Number(value);
    }
    return value;
};

Rule.template = function (str, obj) {

    return str.replace(/{{\s*(\w+)\s*}}/g, function (match, field) {

        return (obj[field] || '');
    });

};

// 手机：仅中国手机适应；以 1 开头，第二位是 3-9，并且总位数为 11 位数字
Rule.addRule('mobile', /^1[3-9]\d{9}$/);

// 座机：仅中国座机支持；区号可有 3、4位数并且以 0 开头；电话号不以 0 开头，最 8 位数，最少 7 位数
//  但 400/800 除头开外，适应电话，电话本身是 7 位数
// 0755-29819991 | 0755 29819991 | 400-6927972 | 4006927927 | 800...
Rule.addRule('telephone', /^(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7})|(?:[48]00[- ]?[1-9]\d{6}))$/);

// 手机+座机
Rule.addRule('phone', /^(1[3-9]\d{9}|(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7}))|(?:[48]00[- ]?[1-9]\d{6}))$/);

Rule.addRule('email', /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);

Rule.addRule('url', /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/);

Rule.addRule('number', /^[+-]?[1-9][0-9]*(\.[0-9]+)?([eE][+-][1-9][0-9]*)?$|^[+-]?0?\.[0-9]+([eE][+-][1-9][0-9]*)?$/);

Rule.addRule('date', /^\d{4}(-|\/|\.)\d{1,2}\1\d{1,2}$/);

//身份证
Rule.addRule('identity', '/(^\d{15}$)|(^\d{17}(?:\d|x|X)$)/');

Rule.addRule('required', function (options) {

    var value = options.value;

    if ($.isArray(value) && value.length === 0) {
        return false;
    }

    if (!$.isArray(value) && value === '') {
        return false;
    }

    return true;
});
//正则表达式
Rule.addRule('regExp', function (options) {

    var regexp = eval(options.pattern);
    var not = options.not || false;

    delete options.not;

    if (not ^ regexp.test(options.value)) {
        return true;
    }

    return false;
});
//区间
Rule.addRule('range', function (options) {

    if (options.min == null && options.max == null) {
        return true;
    }

    var type = options.type;

    if (!type) {
        throw new Error('rang mode needs type');
    }

    var min = options.min == null ? null : Rule._formatValue(options.min, type);
    var max = options.max == null ? null :  Rule._formatValue(options.max, type);
    var value =  Rule._formatValue(options.value, type);

    if (min === null){
        return value <= max ? true : false;
    } else if (max === null) {
        return value >= min ? true : false;
    } else {
        return min <= value && value <= max ? true : false;
    }

});
//自定义
Rule.addRule('customize', function (options, defer) {

    var operator = options.operator || function () {return true};

    var fn = new Function('options, defer, $', operator);

    delete options.operator;

    return fn.call(this, options, defer, $);
});

Rule.addRule('ajax', function (options, defer) {

    try {
        options.url = new Function('$', options.url).call(this, $) || '';
    } catch (e) {}

    if (!options.url) {
        throw new Error('ajax mode needs url');
    }

    options.data = options.params || {};
    options.data[options.$el.attr('name')] = options.value;
    options.dataType || (options.dataType = 'json');

    delete options.value;

    $.ajax(options).done(function (data) {

        data = data || {};

        if (data.code == -1 || data.code !== 0) {
            defer.reject(Rule.template(data.error || options.errorMessage, data));
        } else {
            defer.resolve();
        }
    }).fail(function () {
        defer.reject('服务器错误，请稍后再试');
    });

});

var Validator = {
    getRule : Rule.getRule,
    addRule : Rule.addRule,
    rules : {
        required : false,
        range : false,
        regExp : true,
        customize : true,
        ajax : false
    },
    Rule : Rule
};

if(typeof module != 'undefined') module.exports = Validator ;