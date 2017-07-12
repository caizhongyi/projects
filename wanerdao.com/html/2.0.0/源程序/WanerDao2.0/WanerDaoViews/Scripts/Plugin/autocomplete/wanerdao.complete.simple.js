(function ($) {
    // Code goes here
    $.fn.AutoCompelteSimple = function (options) {
        var defaults = {
            displayCount: 8, /*必需*/
            itemHieght: 20, /*必需*/
            nofind: null,
            fingMsg: null, /*提示栏的信息*/
            displayValueField: null, /*绑定的隐藏值 必填*/
            displayTextField: null, /*绑定的显示文本 必填*/
            displayCommentField: null, /*绑定的注释文本：显示文本(注释文本)*/
            callback: null, /*选择后的回调函数 必填*/
            operType: null,
            params:null,//其它参数
            url: null,
            operType: null
        };

        options = $.extend(defaults, options);
        if (options.displayValueField && options.displayTextField && options.operType && options.callback) {
            var curIndex;
            var maxCount;
            var $this = $(this);
            var top = $(this).position().top + $(this).height();
            var left = $(this).position().left;
            var width = $(this).width();

            var li = '<li value="{0}" text="{1}" desc="{2}" >{3}</li>';
            var jMain;
            var jTip;
            var jitems;

            $(this).attr('AUTOCOMPLETE', 'off');

            $(this).bind('focus', function () {
                if ($('.fmain').length == 0) {
                    jMain = jQuery('<div class="fmain"></div>').appendTo($this.parent()).css({ 'position': 'absolute', 'width': width + 'px', 'top': top + 'px', 'left': +left + 'px' });
                    jTip = jQuery('<div class="ftip"></div>').appendTo(jMain).css({ 'height': '20px' });
                    jitems = jQuery('<div class="fitems"><ul></ul></div>').appendTo(jMain).css('position', 'relative');
                    jitems.find('ul').css({ 'list-style': 'none', 'margin': '0', 'padding': '0' });
                }
            });

            $(this).bind('keyup', function (e) {
                top = $this.position().top + $this.height();
                left = $this.position().left;
                width = $this.width();
                jMain.css({ 'position': 'absolute', 'width': width + 'px', 'top': top + 'px', 'left': +left + 'px' });

                if ($(this).val()) {
                    if (e.keyCode == '38') {
                        if (maxCount > 0) {
                            if (curIndex > 0) {
                                removeLISelectClass(curIndex);
                                curIndex--;
                                addLISelectClass(curIndex);
                                var jitems_top = parseInt(jitems.css('margin-top'));
                                if ((jitems_top + (curIndex * 20)) < 0) {
                                    jitems.css('margin-top', (jitems_top + 20) + 'px');
                                }
                            }
                        }
                    } else if (e.keyCode == '40') {
                        if (maxCount > 0) {
                            if (curIndex < maxCount - 1) {
                                removeLISelectClass(curIndex);
                                curIndex++;
                                addLISelectClass(curIndex);
                                var jitems_top = parseInt(jitems.css('margin-top'));
                                if ((jitems_top + (curIndex * 20)) >= (defaults.displayCount * 20)) {
                                    jitems.css('margin-top', (jitems_top - 20) + 'px');
                                }
                            }
                        }
                    }
                    else if (e.keyCode == '13') {
                        if (maxCount > 0) {
                            //data = jQuery.parseJSON('{"value":"' + jitems.find('ul').find('li.over').attr('qid') + '","text":"' + jitems.find('ul').find('li.over').html() + '"}');
                            if (options.callback) options.callback({ value: jitems.find('ul').find('li.over').attr('value'), text: jitems.find('ul').find('li.over').attr('text'), desc: jitems.find('ul').find('li.over').attr('desc') });
                            jMain.css('display', 'none');
                            maxCount = 0;
                            jitems.find('ul').empty();
                        }
                    }
                    else {

                        jTip.html('<img src="/images/write.gif" style="float:right"/>');
                        getData($(this).val());
                    }
                }
                else {
                    jMain.hide();
                }
            });

            $(this).bind('blur', function () {
                if (maxCount == 0) {
                    jMain.remove();
                    //jMain.css('display', 'none');
                }
            });

            var getData = function (key) {

                ajaxfunc(options.url, "{opertype:'" + options.operType + "',keyword:'" + $this.val() + "'" + (options.params ? "," + options.params : '') + "}", function () {
                }, function (data) {
                    renderData(data);
                });
            }

            var renderData = function (data) {
                jitems.find('ul').empty();
                curIndex = 0;
                maxCount = 0;
                if (typeof data != 'undefined' && data.rows && data.rows.length > 0) {
                    jQuery.each(data.rows, function (k, v) {
                        jitems.find('ul').append(format(li, v[options.displayValueField], v[options.displayTextField], (options.displayCommentField == null ? '' : v[options.displayCommentField]), v[options.displayTextField] + (options.displayCommentField == null ? '' : '(' + v[options.displayCommentField] + ')')));
                    });
                    maxCount = data.rows.length;
                    curIndex = 0;
                    if (defaults.fingMsg) {
                        jTip.html(format(defaults.fingMsg, curIndex + 1, maxCount)).show();
                    } else {
                        jTip.hide();
                    }
                    var ul = jitems.find('ul');
                    ul.find('li:eq(0)').addClass('over');
                    ul.find('li').css('height', defaults.itemHieght + 'px');
                    ul.find('li').bind('mouseover', function () {
                        $(this).parent().find('li').each(function () {
                            if ($(this).hasClass('over')) {
                                $(this).removeClass('over');
                            }
                        });
                        //$(this).addClass('over');
                        curIndex = ($(this).position().top) / 20;
                        addLISelectClass(curIndex);
                    });
                    ul.find('li').bind('click', function () {
                        //data = jQuery.parseJSON({ value: $(this).attr('value'), text: $(this).attr('text'), desc: $(this).attr('desc') });
                        if (options.callback) options.callback({ value: $(this).attr('value'), text: $(this).attr('text'), desc: $(this).attr('desc') });
                        $(this).val('');
                        jMain.css('display', 'none');
                        maxCount = 0;
                        jitems.find('ul').empty();
                    });
                    jMain.css('display', 'block');
                }
                else {
                    if (options.nofind) {
                        jTip.html(options.nofind);
                        jMain.css('display', 'block');
                    } else {
                        jMain.css('display', 'none');
                    }
                }
            }

            function format(source, params) {
                if (arguments.length == 1)
                    return function () {
                        var args = $.makeArray(arguments);
                        args.unshift(source);
                        return format.apply(this, args);
                    };
                if (arguments.length > 2 && params.constructor != Array) {
                    params = $.makeArray(arguments).slice(1);
                }
                if (params.constructor != Array) {
                    params = [params];
                }
                $.each(params, function (i, n) {
                    source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
                });
                return source;
            }

            function addLISelectClass(index) {
                if (!$(jitems.find('ul').find('li')[index]).hasClass('over'))
                    $(jitems.find('ul').find('li')[index]).addClass('over');

                if (defaults.fingMsg) {
                    jTip.html(format(defaults.fingMsg, curIndex + 1, maxCount));
                }
            }

            function removeLISelectClass(index) {
                if ($(jitems.find('ul').find('li')[index]).hasClass('over'))
                    $(jitems.find('ul').find('li')[index]).removeClass('over');
            }
        }
    }
})(jQuery);