// 让不支持placeholder的浏览器实现此属性
;(function($){
    $.placeholder = function(options){
        var opts = $.extend(true,{},{
            event : 'keypress' //'keypress';
        },options);

        var blur = "blur.placeholder",
            keypress = 'keyup.placeholder',
            focus =  'focus.placeholder';
        
        var input_placeholder = $("input[placeholder],textarea[placeholder]")

        function getColor($input,$label){
            var $obj = $input;
            var color = $label && $label.css('color');
            if($obj.attr('placeholder-color')){
                color =  $obj.attr('placeholder-color');
            }
            return color || '#999';
        };

        function getInputCss($input,$label){
            var $obj = $input;
            var left = parseFloat($obj.css('padding-left')) + parseFloat($obj.css('margin-left'));
            var inputCss = {
                'position':'absolute',
                color :getColor($obj),
                left : left,
                top : 0,
                width :$obj.width(),
                marginTop :$obj.css('margin-top'),
                marginBottom :$obj.css('margin-bottom'),
                paddingTop :$obj.css('padding-top'),
                paddingBottom :$obj.css('padding-bottom'),
                height : $obj.outerHeight()
            };

            if($obj[0].tagName == 'INPUT'){
                inputCss.lineHeight = $obj.css('height');
            }
            else if($obj[0].tagName == 'TEXTAREA'){
                inputCss.lineHeight = $obj.css('line-height');
                inputCss.paddingTop = $obj.css('padding-top');
                inputCss.paddingBottom = $obj.css('padding-bottom');
            }

            $obj.attr({
                'data-left' : left
            });
            return inputCss;
        };

        if(opts.event == 'keypress' || opts.event == 'keypress' || opts.event == 'keydown'){
            //keypress
            //==================================inputdefault 输入框属性扩展=============================
            input_placeholder.each(function(){//请勿对输入框和文本区域以外的标签使用inputdefault属性

                $(this).wrap('<span style="display: inline-block;position: relative;"></span>').attr('placeholder-val',$(this).attr('placeholder'));
                if($.browser.msie && $.browser.version == '7.0'){
                }
                else{
                    $(this).attr('placeholder','');
                }

                var _this = this;

                var $label = $('<span>'+ $(this).attr("placeholder-val") +'</span>').insertAfter($(this)).hide().click(function(){
                    $(_this).focus();
                }).addClass('placeholder-label');

                var color = getColor($(this),$label);
                var inputCss = getInputCss($(this),$label);
                $label.css(inputCss);

                if($(this).val() == ""){
                    $label.text($(this).attr("placeholder-val")).show();
                }
            }).off(keypress).on(keypress,function(){
                    var $label = $(this).next();
                    if($(this).val() != '' ){
                        $label.stop(true).animate({left: $(this).width() -  parseFloat($(this).attr('data-left')) , opacity : 'hide'},'fast');
                    }
                }).die(blur).live(blur,function(){
                    var $label = $(this).next();
                    if($(this).val() == '' ){
                        $label.stop(true).animate({left: $(this).attr('data-left') , opacity : 'show'},'fast');
                    }
                });
            return ;
        };

        //focus
        function supports_input_placeholder(){
            var i = document.createElement("input");
            return "placeholder" in i;
        }

        if (input_placeholder.length !== 0 && !supports_input_placeholder()) {
            var color_place =  getColor($(this));
            input_placeholder.each(function(i){
                var _this = this;
                $(this).attr('isUserEnter',0); // 是否为用户输入内容,placeholder允许用户的输入和默认内容一样

                var ph = $(this).attr("placeholder");
                $(this).attr('data-default-color',$(this).css("color"));
                var curColor = $(this).css("color");
                var inputCss = getInputCss($(this));

                if($(this).is(':password')){
                    var $wrap = $('<span/>').css({'display' : 'inline-block' , 'position' : 'relative'}),
                        $placeholder = $('<span/>').text(ph).css(inputCss).addClass('placeholder-label');
                    $(this).wrap($wrap);
                    $placeholder.appendTo($(this).parent());
                    $placeholder.click(function(){
                        $placeholder.hide();
                        $(_this).val("").css("color", curColor).focus();
                    });
                }
                else{
                    $(this).val(ph).css("color", color_place);
                }
            }).die(focus).live(focus,function(){
                    if ($(this).val() == $(this).attr("placeholder") && !$(this).attr('isUserEnter')) $(this).val("").css("color",  $(this).attr('data-default-color'));
                })
                .die(blur).live(blur,function(){
                    if ($(this).val() == "") {
                        if($(this).is(':password')){
                            $(this).next().show().css("color", color_place);
                        }
                        else{
                            $(this).val($(this).attr("placeholder")).css("color", color_place);
                        }
                        $(this).attr('isUserEnter',0);
                    }
                })
                .die(keypress).live(keypress,function(){
                    if ($(this).val() !== $(this).attr("placeholder"))  $(this).attr('isUserEnter',1);
                });
        }
    };
    $(function(){
        $.placeholder();
    });
})(jQuery);
