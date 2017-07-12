(function ($) {
    var typeName = ['活动', '圈子', '日志', '杂烩'];
    var selectName = ['活动', '圈子', '分类', '杂烩'];
    var moreOperType = ['moreactivity', 'moregroup', 'moreblog', 'moreinfor'];
    $.fn.ShareTools = function (options) {
        var defaults = {
            showAcitivity: false,
            showGroup: false,
            showBlog: false,
            showInformations: false,
            handlerTip: '共享到其它地方',
            closeTip: '收回共享',
            activityHandler: null,
            groupHandler: null,
            blogHandler: null,
            inforHandler: null
        };

        var options = $.extend({}, defaults, options);
        var jShareTools = $(this);
        var jShareHandler = jQuery(format('<a href="javascript:void(0);" class="hander" style=" float:left;">{0}</a>', options.handlerTip)).appendTo(jShareTools);
        var jShareMain = jQuery(format('<div class="container"><div><a href="javascript:void(0);" class="close">{0}</a></div><div></div></div>', options.closeTip)).appendTo(jShareTools);
        var jContainer = jShareMain.find('div:eq(1)');

        var jShareActivity;
        if (options.showAcitivity) {
            jShareActivity = jQuery('<div class="share_activity"></div>').appendTo(jContainer);
        }

        var jShareGroup;
        if (options.showGroup) {
            jShareGroup = jQuery('<div class="share_group"></div>').appendTo(jContainer);
        }

        var jShareBlog;
        if (options.showBlog) {
            jShareBlog = jQuery('<div class="share_blog"></div>').appendTo(jContainer);
        }

        var jShareInfor;
        if (options.showInformations) {
            jShareInfor = jQuery('<div class="share_infor"></div>').appendTo(jContainer);
        }

        jShareHandler.click(function () {
            jShareMain.show();
            if (jShareActivity) {
                if (jShareActivity.find('select').length == 0) {
                    showUI('/sharetools_common.axd', jShareActivity, 'currentuserjoinactivitypage', 0, options.activityHandler);
                }
            }

            if (jShareGroup) {
                if (jShareGroup.find('select').length == 0) {
                    showUI('/sharetools_common.axd', jShareGroup, 'mygrouplist', 1, options.groupHandler);
                }
            }

            if (jShareBlog) {
                if (jShareBlog.find('select').length == 0) {
                    showUI('/sharetools_blog.axd', jShareBlog, 'getcuruserblogcat', 2, options.blogHandler);
                }
            }

            if (jShareInfor) {
                if (jShareInfor.find('select').length == 0) {
                    showUI('/sharetools_common.axd', jShareInfor, 'getcurrentinfo', 3, options.inforHandler);
                }
            }
        });

        jShareMain.find('a.close').click(function () {
            jShareMain.hide();
        });

        function showUI(url, container, opertype, type, callback) {
            container.html('<img src="/images/write.gif"/>');
            ajaxData(url, {
                opertype: opertype,
                pagecurrent: 1,
                pageSize: 10000
            }, function (data) {
                container.html('');
                container.append('<input type="checkbox" class="sharechk"/> 共享到' + typeName[type] + ' ');
                var list = jQuery('<select></select>').appendTo(container);
                list.append(format('<option value="">选择{0}</option>', selectName[type]));
                if (data.result && data.rows) {
                    $.each(data.rows, function (i, v) {
                        if (type == 0) {
                            list.append(format('<option value="{0}">{1}</option>', v.id, v.activity_name));

                        } else if (type == 1) {
                            list.append(format('<option value="{0}">{1}</option>', v.id, v.name));
                        } else if (type == 2) {
                            list.append(format('<option value="{0}">{1}</option>', v.id, v.category_name));
                        } else {
                            list.append(format('<option value="{0}">{1}</option>', v.id, v.name));
                        }
                    });
                }
                container.append(' ');
                var input = jQuery('<input type="text" cid=""/>').appendTo(container);
                input.css('width', '80px');
                input.attr('readonly', true);

                container.find('input[type="checkbox"]').click(function () {
                    var data;
                    if ($(this).attr('checked')) {
                        if (input.attr('cid')) {
                            data = { id: input.attr('cid'), name: input.val() };
                        }
                    }
                    callback(data);
                });

                container.find('select').change(function () {
                    var value = '';
                    var text = '';
                    var data;
                    if ($(this).val()) {
                        value = $(this).val();
                        text = $(this).children('option:selected').text();
                        input.val(text);
                        input.attr('cid', value);
                        input.change();
                    } else {
                        input.val(text);
                        input.attr('cid', value);
                        input.change();
                    }
                });

                input.change(function () {
                    if (container.find('input[type="checkbox"]').attr('checked')) {
                        var data;
                        if ($(this).val()) {
                            value = $(this).attr('cid');
                            text = $(this).val();
                            data = { id: value, name: text };
                        }
                        callback(data);
                    }
                });

            });
        }

        function format(source, params) {
            if (arguments.length == 1)
                return function () {
                    var args = $.makeArray(arguments);
                    args.unshift(source);
                    return this.apply(this, args);
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



        function ajaxData(url, params, callback) {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "json",
                cache: false,
                data: params,
                error: function (data) {
                },
                success: function (data) {
                    if (callback) callback(data);
                }
            });
        }
    }
})(jQuery);