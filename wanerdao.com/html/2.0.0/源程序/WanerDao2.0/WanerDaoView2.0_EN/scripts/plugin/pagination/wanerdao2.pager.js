//玩儿道自有分页插件
/*
 *	作者：金广亮
 *  时间：2012-4-11
 *  描述：本插件可以自定义操作多种组合方式
 *  修改时间：2012-10-6
 *  修改描述：
 *  1.新增收缩数据展示功能
 *  修改时间：2012-7-17
 systole:
            {
                disabled: true, //如果为true表示禁用收缩功能，否则显示收缩功能
                config: {
                    id: '', //收缩ID，当disabled为false时，不允许为空。
                    showtext: wanerdaoLangTip('common_00077'), //展示文本
                    showcls: 'icon icon-packup', //展示样式
                    hidetext: wanerdaoLangTip('common_00078'), //隐藏后文本
                    hidecls: 'icon icon-packup'//隐藏后样式
                }
            }
 *  修改描述：
 *  1.新增toolbarcls工具条样式类
 *  2.新增多语言化支持
 *  3.新增首页、尾页、下一页、上一页的可用时候的样式XXXCLS,不可用时候的样式xxxdiscls

    修改者：王薪杰
    修改时间：2012-8-26
    修改描述：
    1.添加属性showinputpageing: true, //是否显示输入翻页 默认显示
    2.修改分页项之间的空格
 */
(function ($) {
    $.fn.myPagination = function (options) {
        var defaults = new Object({
            toolbar: null, //自定义工具条
            toolbarcls: 'f_left', //工具条样式可以自定义
            showmore: false, //是否显示"加载更多"
            showmorecls: 'morebar', //"加载更多"层样式
            showmoretext: wanerdaoLangTip('pager_00006'), //显示"加载更多"文本，可以自定义
            showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
            showinputpageing: true, //是否显示输入翻页 默认显示
            pagermore: false, //是否显示分页导航处的"显示更多"
            pagermoretext: wanerdaoLangTip('pager_00005'), //显示"显示更多"文本，可以自定义
            navcls: 'pageList f_right', //上下页导航的样式
            contentid: '', //用于数据加载提示(如果此处ID不为空，在数据加载时候有loading图片出现)
            callback: null, //回调函数
            ajax: {
                url: '.axd',
                param: {
                    pagecurrent: 1,
                    pageSize: 2,
                    opertype: ''
                }
            },
            info: {
                first: wanerdaoLangTip('pager_00001'),
                firstcls: '', //可用时候的样式
                firstdiscls: 'disable', //不可用时候的样式
                last: wanerdaoLangTip('pager_00002'),
                lastcls: '',
                lastdiscls: 'disable',
                next: wanerdaoLangTip('pager_00004'),
                nextcls: '',
                nextdiscls: 'disable',
                prev: wanerdaoLangTip('pager_00003'),
                prevcls: '',
                prevdiscls: 'disable',
                first_on: true,
                last_on: true,
                next_on: true,
                prev_on: true,
                msg_on: true,
                tipmsg: wanerdaoLangTip('pager_00010'),
                nodatamsg: wanerdaoLangTip('pager_00017')//当加载到最后一页时候的提示信息，只适用于"加载更多"、"显示更多"
            },
            systole:
            {
                disabled: true, //如果为true表示禁用收缩功能，否则显示收缩功能
                config: {
                    id: '', //收缩ID，当disabled为false时，不允许为空。
                    showtext: wanerdaoLangTip('common_00077'), //展示文本
                    showcls: 'icon icon-packup', //展示样式
                    hidetext: wanerdaoLangTip('common_00078'), //隐藏后文本
                    hidecls: 'icon icon-packup'//隐藏后样式
                }
            }
        });
        var opts = $.extend({}, defaults, options);
        opts.info = $.extend(defaults.info, options.info); //配置info的合并（徐蓓2012-8-4添加）
        opts.systole = $.extend(defaults.systole, options.systole); //配置systole的合并（金广亮2012-10-6添加）
        var currPage = opts.ajax.param.pagecurrent; //当前页
        var pageCount = 0; //总页数
        var pageSize = opts.ajax.param.pageSize; //页码数
        var total = 0; //总条数
        var $this = $(this); //获取加载分页对象
        var more = false; //此开关判断是否出现加载更多
        //当前页
        function getTipMsg(pagenum) {
            return opts.info.tipmsg.replace("{tip}", pagenum);
        }
        function getFirst() {
            if (opts.info && opts.info.first_on == false) {
                return "";
            }
            if (opts.info && opts.info.first_on && opts.info.first) {
                var str = "";
                if (pageCount === 0 | pageCount === 1 | currPage === 1) {
                    str = '<span class="' + opts.info.firstdiscls + '">' + opts.info.first + '</span>';
                }
                else
                    str = "<a href='javascript:;' title='" + getTipMsg(1) + "' class='" + opts.info.firstcls + "'>" + opts.info.first + "</a>";
                return str + "";
            }
        }
        function getLast(pageCount) {
            if (opts.info && opts.info.last_on == false) {
                return "";
            }
            if (opts.info && opts.info.last_on && opts.info.last) {
                var str = "";
                if (pageCount === 0 | pageCount === 1 | pageCount === currPage) {
                    str = '<span class="' + opts.info.lastdiscls + '">' + opts.info.last + '</span>';
                }
                else {
                    str = "<a href='javascript:;' title='" + getTipMsg(pageCount) + "' class='" + opts.info.lastcls + "'>" + opts.info.last + "</a>";
                }
                return str;
            }
        }
        function getPrev() {
            if (opts.info && opts.info.prev_on == false) {
                return "";
            }
            if (opts.info && opts.info.prev) {
                return opts.info.prev;
            }
        }
        function getNext() {
            if (opts.info && opts.info.next_on == false) {
                return "";
            }
            if (opts.info && opts.info.next) {
                return opts.info.next;
            }
        }
        function getText() {
            var tmp = 0;
            if (pageCount != 0) {
                tmp = currPage;
            }
            var input = "<input type='text' value='" + tmp + "' class='text' />";
            return input;
        }
        function getInt(val) {
            return parseInt(val);
        }
        function getCurrPage() {
            opts.ajax.param.pagecurrent = currPage;
        }
        //分页算法
        function showMoreUI() {
            var p = getInt(currPage) + 1;
            var moreui = '<div class="' + opts.showmorecls + '">';
            if (p > pageCount) {
                moreui += opts.info.nodatamsg + '</div>';
            }
            else {
                moreui += opts.showmoretext.replace("{tip}", getTipMsg(p)) + '</div>';
            }
            return $(moreui);
        }
        //收缩
        function showSystole() {
            var _s = '<a href="javascript:;" class="' + opts.systole.config.showcls + '" systole="true" isshow="show">' + opts.systole.config.showtext + '</a>&nbsp;';
            return _s;
        }
        //分页界面
        function showNavUI() {
            if (opts.showpagingnav) {
                $this.empty();
                //工具条构造
                var ui = null;
                if (opts.toolbar) {
                    ui = $this.append('<div class="' + opts.toolbarcls + '"/>').find("." + opts.toolbarcls); //工具条
                    $.each(opts.toolbar, function (i, n) {
                        var p = n;
                        if (p) {
                            switch (p.type.toLowerCase()) {
                                case 'checkbox': //{ text: '全选', cls: 'checkbox', type: 'checkbox', handler: function ()}newGuid()作为新生成选择框的ID
                                    var ck = $('<input type="checkbox" class="' + p.cls + '"/>').appendTo(ui).click(function () {
                                        if (p.handler) {
                                            p.handler(ck);
                                        }
                                    });
                                    break;
                                case 'button': //{ text: '提醒缴费', cls: '', type: 'button', handler: function () }
                                    var btn = $('<input type="button"  value="' + p.text + '" class="' + p.cls + '"/>').appendTo(ui).click(function () {
                                        if (p.handler) {
                                            p.handler(btn);
                                        }
                                    });
                                    break;
                                case 'select': //只允许select返回数据为ID与VALUE集合{ cls: '', type: 'select',url:'',ajaxdata:'',localdata:[{"id":"1","value":"1"},{"id":"2","value":"2"}], handler: function ()}
                                    var select1 = $('<select class="' + p.cls + '" />').appendTo(ui).change(function () {
                                        if (p.handler) {
                                            p.handler(select1);
                                        }
                                    });
                                    if (!p.url == '' && p.ajaxdata !== '') {
                                        ajaxfunc(p.url, p.ajaxdata, function (data) { }, function (data) {
                                            if (data.result) {
                                                bindDropDownListbyobject(select1, data.data, true);
                                            }
                                            else
                                                bindDropDownListbyobject(select1, null, false);
                                        });
                                    }
                                    else {
                                        bindDropDownListbyobject(select1, p.localdata, true);
                                    }
                                    break;
                                case 'img': //{ text: '提醒缴费',cls: '', type: 'img',width:'',height:'',src:'', handler: function ()}
                                    var img1 = $('<img alt="' + p.text + '" src="' + p.src + '"  width="' + p.width + '" height="' + p.height + '" class="' + p.cls + '"/>').appendTo(ui).click(function () {
                                        if (p.handler) {
                                            p.handler(img1);
                                        }
                                    });
                                    break;
                                case 'separator': //{ type: 'separator',symbol:'|'}
                                    $('<span>' + p.symbol + '</span> ').appendTo(ui);
                                    break;
                                case 'text': //{ cls: 'checkbox',type: 'text', handler: function ()}
                                    var text1 = $('<input type="text" class="' + p.cls + '"/>').appendTo(ui).change(function () {
                                        if (p.handler) {
                                            p.handler(text1);
                                        }
                                    });
                                    break;
                                case 'a': //{ cls: 'checkbox',type: 'a',title:'' handler: function ()}
                                    var a1 = $('<a href="javascript:;" title="' + p.title + '" class="' + p.cls + '">' + p.title + '</a>').appendTo(ui).click(function () {
                                        if (p.handler) {
                                            p.handler(a1);
                                        }
                                    });
                                    break;
                                case "span": //徐蓓 2012-8-4添加
                                    var span = $("<span class='" + p.cls + "'>" + p.title + "</span>").appendTo(ui);
                                    break;
                                case "userdefined":
                                    var c = $(p.html).appendTo(ui);
                                    if (p.handler) {
                                        p.handler(c);
                                    }
                                    break;
                            }
                        }
                    });
                }
                //分页导航
                var nav = $('<div class="' + opts.navcls + '"/>');
                var content = ''; //
                if (opts.systole && !opts.systole.disabled) {
                    content += showSystole();
                }
                if (opts.pagermore) {
                    var p = getInt(currPage) + 1;
                    if (p > pageCount) {
                        content += opts.info.nodatamsg;
                    }
                    else {
                        content += opts.pagermoretext.replace("{tip}", getTipMsg(p));
                    }
                }
                //                if (opts.info && opts.info.msg_on == true) {
                //                    if (opts.showinputpageing) {
                //                        //content += "&nbsp;&nbsp;<span>" + wanerdaoLangTip('pager_00007') + "</span>";
                //                        content += getText();
                //                        //content += '<span>' + wanerdaoLangTip('pager_00008') + '</span>';
                //                    }
                //                    content += '/<span>'+ pageCount + '</span>';
                //                    content += '<span>(' + total + ')</span>&nbsp;';
                //                    //content += '&nbsp;&nbsp; <span>' + wanerdaoLangTip('pager_00011') + '</span>&nbsp;<span>';
                //                    //content += pageCount + '</span>&nbsp;<span>' + wanerdaoLangTip('pager_00008') + '</span>&nbsp;';                    
                //                    //content += '<span>' + wanerdaoLangTip('pager_00011') + '</span>&nbsp;<span>' + total + '</span>&nbsp;<span>' + wanerdaoLangTip('pager_00009') + '</span>&nbsp;';
                //                }
                content += getFirst();
                if (pageCount != 0) {
                    currPage = getInt(currPage);
                    pageCount = getInt(pageCount);
                    if (currPage == 1) {
                        content += '<span class="' + opts.info.prevdiscls + '">' + getPrev() + '</span>';
                    } else {
                        content += "<a href='javascript:;' title='" + getTipMsg(currPage - 1) + "' class='" + opts.info.prevcls + "'>" + getPrev() + " </a>";
                    }
                    if (opts.info && opts.info.msg_on == true) {
                        if (opts.showinputpageing) {
                            content += getText();
                        }
                        content += '/<span title="' + wanerdaoLangTip('pager_00011') + total + wanerdaoLangTip('pager_00009') + '">' + pageCount + '</span>';
                        //content += '<span>(' + total + ')</span>';                        
                    }
                    if (currPage == pageCount) {
                        content += '<span class="' + opts.info.nextdiscls + '">' + getNext() + '</span>'; // "<span class=\"disabled\" title=\"" + getTipMsg(currPage) + "\">" + getNext() + " </span>"
                    } else {
                        content += "<a href='javascript:;' title='" + getTipMsg(currPage + 1) + "' class='" + opts.info.nextcls + "'>" + getNext() + " </a>"
                    }
                }
                content += getLast(pageCount);

                nav.append(content);
                nav.appendTo($this);
                var pages = $this.find("." + opts.navcls.substring(0, opts.navcls.indexOf(" ") > 0 ? opts.navcls.indexOf(" ") : opts.navcls.length));
                pages.children(":text").keypress(function (event) {
                    var keycode = event.which;
                    if (keycode == 13) {
                        var page = $(this).val();
                        if (isCode(page)) {
                            pages.children("a").unbind("click");
                            pages.children("a").each(function () {
                                $(this).click(function () {
                                    return false;
                                })
                            });
                            currPage = page;
                            loadUI();
                        }
                    }
                });
                pages.children("a").each(function (i) {
                    var page = this.title;
                    $(this).click(function () {
                        if ($(this).attr("systole")) {
                            var _a = pages.find("a[isshow]");
                            if ($(this).attr("isshow") === "show") {
                                _a.attr("isshow", "hide");
                                _a.removeClass(opts.systole.config.showcls).addClass(opts.systole.config.hidecls);
                                _a.html(opts.systole.config.hidetext);
                                $(opts.systole.config.id).stop(true, true).animate({ height: 'hide' });
                                return false;
                            }
                            else {
                                _a.attr("isshow", "show");
                                _a.removeClass(opts.systole.config.hidecls).addClass(opts.systole.config.showcls);
                                _a.html(opts.systole.config.showtext);
                                $(opts.systole.config.id).stop(true, true).animate({ height: 'show' });
                                return false;
                            }
                        }
                        else {
                            pages.children("a").unbind("click");
                            pages.children("a").each(function () {
                                $(this).click(function () {
                                    return false;
                                })
                            });
                            var re = /\d+/;
                            var p = page.match(re)[0];
                            currPage = p;
                            loadUI();
                            $(this).focus();
                            return false;
                        }
                    })
                });
            }
            if (opts.showmore && pageCount != 0) {
                $('.' + opts.showmorecls).remove();
                $this.prepend(showMoreUI());
                $('.' + opts.showmorecls + ' a').click(function () {
                    var page = this.title;
                    var re = /\d+/;
                    var p = getInt(page.match(re)[0]);
                    if (p <= pageCount) {
                        more = true;
                        currPage = p;
                        loadUI();
                        $(this).focus();
                    }
                    return false
                });
            }
            //            //2012-10-6，新增收缩功能
            //            if (opts.systole && !opts.systole.disabled) {
            //                var _t = showSystole();
            //                $this.prepend(_t);
            //                _t.click(function () {
            //                    if ($(this).hasClass(opts.systole.config.showcls)) {
            //                        $(this).removeClass(opts.systole.config.showcls).addClass(opts.systole.config.hidecls);
            //                        $(this).html(opts.systole.config.hidetext);
            //                        $(opts.systole.config.id).stop(true, true).animate({ height: 'hide' });
            //                    }
            //                    else {
            //                        $(this).removeClass(opts.systole.config.hidecls).addClass(opts.systole.config.showcls);
            //                        $(this).html(opts.systole.config.showtext);
            //                        $(opts.systole.config.id).stop(true, true).animate({ height: 'show' });
            //                    }
            //                });
            //            }
        }
        //先加载ajax之后在创建UI
        function loadUI() {
            getCurrPage();
            ajaxfuncbyloading(opts.ajax.url, opts.ajax.param, opts.contentid, function (data) {
                $(opts.contentid).empty().append(wanerdaoLangTip('common_00027'));
            }, function (data) {
                if (data.result) {
                    total = getInt(data.total);
                    pageCount = Math.ceil(total / pageSize);
                    var callback = opts.callback(data, total, more);
                    eval(callback || function () { });
                    $this.empty();
                    showNavUI();
                }
                else {
                    $(opts.contentid).empty().append(data.msg); //wanerdaoLangTip('common_00026'));
                }
            });
        }
        //基础效验
        function isCode(val) {
            if (val < 1) {
                alert(wanerdaoLangTip('pager_00012'));
                return false;
            }
            var patrn = /^[0-9]{1,8}$/;
            if (!patrn.exec(val)) {
                alert(wanerdaoLangTip('pager_00013'));
                return false;
            }
            if (val > pageCount) {
                alert(wanerdaoLangTip('pager_00014'));
                return false;
            }
            return true;
        }
        function checkParam() {
            if (currPage < 1) {
                alert(wanerdaoLangTip('pager_00015'));
                return false;
            }
            if (pageSize < 2) {
                alert(wanerdaoLangTip('pager_00016'));
                return false;
            }
            return true;
        }
        if (checkParam()) {
            showNavUI();
            loadUI();
        }
    }
})(jQuery);