var Class = window.Class ||  require('class'),
    $ = window.jQuery ||  require('jquery'),
     Field = window.Field || require('field.js');


/**
 * 表单验证
 * @return object
 * */

var Form =  Class.create({
    initialize: function( selector , config ) {
        this.config =  $.extend({}, {
            fieldClass : 'field',
            failClass : 'field-fail',
            doneClass : 'field-done',
            processClass   : 'field-process',
            focusClass   : 'field-focus'
        }, config );

       this.$ = $( selector );

        if (!this.$.size()) {
            throw new Error('el is incorrect');
        }

        var self = this;

        var $form = this.$;

        // 遍历表单字段
        // todo: type hidden input
        $form.find('input[name], select[name], textarea[name]').each(function () {

            var $input = $(this);
            var type = $input.attr('type');
            var name = $input.attr('name');
            var rules = $input.data('rules') || {};

            // 丢弃没有规则的field
            // if ($.isEmptyObject(rules)) {
            //     return true;
            // }

            var config = {};

            if (type == 'radio' || type == 'checkbox') {
                config.el = $('[type="' + type + '"][name="' + name + '"]', $form);
            } else {
                config.el = $input;
            }

            if (!self.getField(name)) {
                $.extend( config, $input.data());
                self.addField( config );
            }
        });


        var fields = self.getField();

        // 初始错误信息
        $.each(fields, function (name, field) {

            var $el = field.$;
            var $target = $(field.getAttr('tipTarget'));

            var type = $el.attr('type');
            var filtered = field.getAttr('filtered');
            var postValue = field.getAttr('postValue');
            var errorMessage = field.getAttr('errorMessage');
            var defaultMessage = field.getAttr('defaultMessage') || '';

            // 后端返回
            if (postValue != undefined) {
                if (type === 'checkbox' || type === 'radio') {

                    postValue = $.isArray(postValue) ? postValue : [postValue];

                    for (var i = 0, l = postValue.length; i < l; i++) {

                        for (var j = 0, m = $el.size(); j < m; j++) {

                            var $tmp = $($el[j]);
                            if ($tmp.val() == postValue[i]) {
                                $tmp.attr('checked', 'checked');
                                break;
                            }
                        }
                    }
                } else {
                    $el.val(postValue);
                }
                if (errorMessage) {
                    $($el[0]).trigger('field-fail', [errorMessage]);
                } else {
                    $($el[0]).trigger('field-done');
                }
            } else if ($target.size()){

                if (!filtered) {
                    $target.html(defaultMessage);
                }

            }
        });

        var offset = self.$.find('.ui-field-fail').offset();

        if (offset) {
            $('html , body').scrollTop(offset.top);
        }

        this.bindEvent();
    },
    /**
     * @description 添加字段
     * @param {} config || Field
     */
    addField : function (config) {

        var fields = this.fields || (this.fields = {});

        var field, name;

        if (config instanceof Field) {

            field = config;
        } else {

            config.form = this;
            field = new Field( config.el , config);
        }

        fields[field.name] = field;
    },

    /**
     * @description 添加字段集合
     * @param array
     */
    addFields : function (fields) {

        var self = this;

        $.each(fields, function (index, field) {

            self.addField(field);
        });
    },

    /**
     * @description 获取字段
     * @param string name
     */
    getField : function (name) {

        var fields = this.fields || (this.fields = {});

        if (name === undefined) {
            return fields;
        }

        return fields[name] || null;
    },

    /**
     * @description 删除字段
     * @param string | array
     */
    removeField : function (name) {

        var self = this;
        var fields = this.fields || (this.fields = {});

        if ($.isArray(name)) {
            $.each(name, function (index, value) {

                self.removeField(value);
            });
            return this;
        }

        if (name) {
            delete fields[name];
        }
        return this;
    },

    /**
     * @description 表单验证
     * @return {} defer
     */
    validate : function () {

        var self = this;
        var fields = this.fields || {};
        var filtered = {};
        var defers = $.map(fields, function (field) {

            var name = field.name;

            if (!field.isValid() && !filtered[name]) {

                var defer = field.validate();
                var next = field.getNext();
                // next不支持异步
                if (next) {
                    defer.fail(function () {
                        do {
                            filtered[next.name] = true;
                            next = next.getNext();
                        } while (next);
                    });
                }
                return defer;
            }
        });

        return $.when.apply($, defers)
            .done(function () {
                self.$.trigger('form-done');
            })
            .fail(function (error) {
                self.$.trigger('form-fail');
            })
            .always(function () {
                // todo : something
            });
    },
    /**
     * @description 判断事件
     * @return {}
     */
    bindEvent : function(){
        var _this = this;
        this.$.off('focus.form field-fail.form field-done.form field-disabled.form click.form field-validate.form blur.form change.form submit.form').on('focus.form','input[name],textarea[name]',function(e){
            var $input = $(e.target);
            var name = $input.attr('name');

            var field = _this.getField(name);

            if (!field) return;

            var focusMessage = field.getAttr('focusMessage') || '';
            var $target = $(field.getAttr('tipTarget'));

            if ($target.size !== 0) {
                $target.html(focusMessage)
                    .parents('.' + (field.getAttr('fieldClass') || _this.config.fieldClass) )
                    .removeClass(field.getAttr('doneClass') || _this.config.doneClass )
                    .removeClass(field.getAttr('failClass') || _this.config.failClass )
                    .removeClass(field.getAttr('processClass') || _this.config.processClass )
                    .addClass(field.getAttr('focusClass') || _this.config.focusClass );
            }
        }).on('field-fail.form',function(e , message){
            var $input = $(e.target);
            var name = $input.attr('name');

            var field = _this.getField(name);

            if (!field) return;

            var errorMessage = message || '';
            var $target = $(field.getAttr('tipTarget'));

            if ($target.size !== 0) {
                $target.html(errorMessage)
                    .parents('.' + (field.getAttr('fieldClass') || _this.config.fieldClass) )
                    .removeClass(field.getAttr('processClass') || _this.config.processClass)
                    .removeClass(field.getAttr('doneClass')|| _this.config.doneClass)
                    .removeClass(field.getAttr('focusClass')|| _this.config.focusClass)
                    .addClass(field.getAttr('failClass') || _this.config.failClass);
            }
        }).on('field-done.form',function( e , tag ){
            var $input = $(e.target);
            var name = $input.attr('name');

            var field = _this.getField(name);

            if (!field) return;

            var message = '';
            var $target = $(field.getAttr('tipTarget'));
            var $parent = $target.parents('.' + (field.getAttr('fieldClass') || _this.config.fieldClass)  );

            if ($target.size !== 0) {
                $target.html(message);
                $parent.removeClass(field.getAttr('processClass') || _this.config.processClass )
                    .removeClass(field.getAttr('focusClass')|| _this.config.focusClass)
                    .removeClass(field.getAttr('failClass') || _this.config.failClass );

                // disabled | 非required
                if (!tag) {
                    $parent.addClass(field.getAttr('doneClass')|| _this.config.doneClass);
                }
            }
        }).on('field-disabled.form',function( e , disabled ){
            var $input = $(e.target);
            var $hidden = null;
            var hiddenName = $input.data('hiddenName');

            if (hiddenName) {
                $hidden = $input.next('[name=' + hiddenName + ']');
                if (!$hidden.size()) {
                    $hidden = $('<input>').attr({
                        type : 'hidden',
                        name : hiddenName
                    });

                    $input.after($hidden);
                }
            }

            if (disabled === false) {

                if ($hidden) {
                    $hidden.val(0).attr('disabled', 'disabled');
                }
                $input.removeAttr('disabled');
            } else {

                if ($hidden) {
                    $hidden.val(1).removeAttr('disabled');
                }
                $input.attr('disabled', 'disabled');
            }
        }).on('submit.form',function( e , disabled ){
            var $form = _this.$,self = this;
            var $button = $(e.target);

            if ($button.data('disabled')) {
                return false;
            }

            // 阻止默认操作（表单提交）
            e.preventDefault();

            var onSubmit = this.submit;

            // 禁止button
            $button.data('disabled', true)
                .addClass('ui-button-disabled');

            _this.validate()
                .done(function () {
                    if (onSubmit.apply(self) !== false) {
                        $form.submit();
                    } else {
                        $button.data('disabled', false)
                            .removeClass('ui-button-disabled');
                    }
                })
                .fail(function () {

                    var offset = $form.find('.ui-field-fail').offset(),
                        $doc = $(document),
                        winTop,
                        winBottom;

                    if (offset) {
                        winTop = $doc.scrollTop();
                        winBottom = $doc.scrollTop() + window.screen.availHeight;
                        if (offset < winTop || offset > winBottom) {
                            $('html , body').scrollTop(offset.top);
                        }
                    }

                    $button.data('disabled', false)
                        .removeClass('ui-button-disabled');
                });
        }).on('blur.form','input[name!=radio][name!=checkbox], textarea[name]', function(e){
            _this.onValidate.call( _this , e );
        })
            .on('change.form','select[name], input[type=radio], input[type=checkbox]', function(e){
                _this.onValidate.call( _this , e );
            })

        return this;
    },
    onValidate : function( e ){
        var $input = $(e.target);
        var name = $input.attr('name');

        var field = this.getField(name);

        if (!name || !field) return;

        var $target = $(field.getAttr('tipTarget'));

        if ($target.size !== 0) {
            $target
                .parents('.' + field.getAttr('fieldClass'))
                .removeClass(field.getAttr('focusClass'))
                .addClass(field.getAttr('processClass'));
        }

        field.validate();
        return this;
    },
    submit : function () {
        return true;
    }
});
if(typeof module != 'undefined') module.exports = Form ;