!(function ($) {
    /**
     * 加减控件
     * @param options { object }
     * @returns {*|jQuery}
     */
    $.fn.spinner = function (options) {
        options = $.extend(true, {}, {
            delegateTarget: '',
            increase: 1,
            max: 9999999,
            min: -9999999
        }, options);

        return $(this).each(function () {
            var self = this;

            if(this.tagName == "INPUT" && $(this).attr('type') == 'number'){
                self = $(this).wrap('<span class="'+ $(this).attr('class') +' input-group input-spinner"></span>').attr('type','text').parent();

                self.append('<a class="spinner-up add-on" href="javascript:;">+</a>');
                self.prepend('<a class="spinner-down add-on" href="javascript:;">-</a>');
            }


            if (!options.delegateTarget) {
                var $input = $(self).find('input')
                if ($input.val() == '') $input.val(0);
                $input.data('spinnerTempVal', $input.val());
            }
            /*   function inputReset(){
             if($(this).val() == '') {
             $(this).val(0);
             }
             }
             */
            function getParams() {
                var me = options.delegateTarget ? $(this).closest(options.delegateTarget) : $(self) , increase = parseFloat( me.attr('step') || options.increase );
                var $input = me.find(':text') , val = parseFloat($input.val()),
                    max = parseFloat($input.attr('max') != undefined ? $input.attr('max') : options.max) ,
                    min = parseFloat($input.attr('min') != undefined ? $input.attr('min') : options.min);
                var spinnerTempVal = $input.data('spinnerTempVal');
                return { me: me, max: max, min: min, increase: increase, $input: $input, val: val, spinnerTempVal: spinnerTempVal}
            }

            function trigger(params, val) {
                if (params.$input.val() == val)  return;

                params.me.trigger('change', params);

                if ($(this).data('keep')) {
                    $(this).removeData('keep')
                    return;
                }
                params.$input.data('spinnerTempVal', params.val);
                params.$input.val(val);
            }


            $(self).off('click.spinner').on('click.spinner', '.spinner-up',function () {
                var params = getParams.call(this) , val = params.val + params.increase <= params.max ? params.val + params.increase : params.max;
                trigger.call(self, params, val);
            }).on('click.spinner', '.spinner-down', function () {
                    var params = getParams.call(this) , val = params.val - params.increase >= params.min ? params.val - params.increase : params.min;
                    params.increase = -params.increase;
                    trigger.call(self, params, val);
                });
            $(self).find('input').off('change.spinner').on('change.spinner', function () {
                var params = getParams.call(this) , val = isNaN(params.val) ? params.spinnerTempVal : params.val;
                if (val < params.min) {
                    val = params.min;
                }
                else if (val > params.max) {
                    val = params.max;
                }
                trigger.call(self, params, val);
            })
        })
    }
})(window.jQuery || Zepto);

