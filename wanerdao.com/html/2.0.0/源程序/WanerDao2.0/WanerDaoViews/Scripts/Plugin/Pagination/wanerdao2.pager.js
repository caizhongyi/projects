//玩儿道自有分页插件
/*
 *	作者：金广亮
 *  时间：2012-4-11
 *  描述：本插件可以自定义操作多种组合方式
 */
(function ($) {
    $.fn.myPagination = function (options) {
        var defaults = new Object({
            toolbar: null, //自定义工具条
            showmore: false, //是否显示加载更多
            showpagingnav: true, //是否显示分页导航,当showpagingnav为false的时候info就暂时不用
            navcls: 'page', //上下页导航的样式
            contentid: '', //用于数据加载提示
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
                first: '首页',
                last: '尾页',
                next: '下一页',
                prev: '上一页',
                first_on: true,
                last_on: true,
                next_on: true,
                prev_on: true,
                msg_on: true,
                tipmsg: '第{tip}页'
            }
        });
        var opts = $.extend({}, defaults, options);
        var currPage = opts.ajax.param.pagecurrent; //当前页
        var pageCount = 0; //总页数
        var pageSize = opts.ajax.param.pageSize; //页码数
        var total = 0; //总条数
        var $this = $(this); //获取加载分页对象
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
                if (pageCount == 0) {
                    str = "<a href='javascript:;' title='" + getTipMsg(pageCount) + "'>" + opts.info.first + "</a>";
                }
                else
                    str = "<a href='javascript:;' title='" + getTipMsg(1) + "'>" + opts.info.first + "</a>";
                return str + "&nbsp;&nbsp;";
            }
        }
        function getLast(pageCount) {
            if (opts.info && opts.info.last_on == false) {
                return "";
            }
            if (opts.info && opts.info.last_on && opts.info.last) {
                var str = "<a href='javascript:;' title='" + getTipMsg(pageCount) + "'>" + opts.info.last + "</a>";
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
            var input = "<input type='text' value='" + tmp + "' class='pageInput'/>";
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
            var p = currPage + 1;
            var moreui = '<div class="downLoadMore">';
            if (p > pageCount) {
                moreui += '<span style="align:center;">已是最后一页</span></div>)';
            }
            else {
                moreui += '<a href="javascript:;" title="' + getTipMsg(p) + '">加载更多↓</a></div>)';
            }
            return $(moreui);
        }
        //分页界面
        function showNavUI() {
            if (opts.showpagingnav) {
                $this.empty();
                var ui = $this.append('<div class="funcBar mt10 vm"/>').find(".funcBar"); //导航
                //$this.append(ui);
                //工具条构造
                if (opts.toolbar) {
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
                            }
                        }
                    });
                }
                //分页导航
                var nav = $('<div class="' + opts.navcls + '"/>');
                var content = '&nbsp;&nbsp;';
                if (opts.info && opts.info.msg_on == true) {
                    content += "<span>第</span>";
                    content += getText();
                    content += '<span>页</span>&nbsp; <span>共</span><span>';
                    content += pageCount + '</span> <span>页</span>&nbsp;<span>共</span><span>' + total + '</span> <span>条</span> &nbsp;';
                }                
                content += getFirst();
                if (pageCount != 0) {
                    currPage = getInt(currPage);
                    pageCount = getInt(pageCount);
                    if (currPage == 1) {
                        content += getPrev() + "&nbsp;&nbsp;";
                    } else {
                        content += "<a href='javascript:;' title='" + getTipMsg(currPage - 1) + "'>" + getPrev() + " </a>&nbsp;&nbsp;";
                    }
                    if (currPage == pageCount) {
                        content += getNext(); // "<span class=\"disabled\" title=\"" + getTipMsg(currPage) + "\">" + getNext() + " </span>"
                    } else {
                        content += "<a href='javascript:;' title='" + getTipMsg(currPage + 1) + "'>" + getNext() + " </a>&nbsp;&nbsp;"
                    }
                }
                content += getLast(pageCount);

                nav.append(content);
                nav.appendTo(ui);
                var pages = ui.find("." + opts.navcls);
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
                        return false
                    })
                });

            }
            if (opts.showmore && pageCount != 0) {
                $('.downLoadMore').remove();
                $(opts.contentid).append(showMoreUI());
                $('.downLoadMore a').click(function () {
                    var page = this.title;
                    var re = /\d+/;
                    var p = getInt(page.match(re)[0]);
                    if (p <= pageCount) {
                        currPage = p;
                        loadUI();
                        $(this).focus();
                    }
                    return false
                });
            }
        }
        //先加载ajax之后在创建UI
        function loadUI() {
            getCurrPage();
            ajaxfuncbyloadmsg(opts.ajax.url, opts.ajax.param, opts.contentid, function (data) {
                $(opts.contentid).empty().append(wanerdaoLangTip('common_00027'));
            }, function (data) {
                if (data.result) {
                    total = getInt(data.total);
                    pageCount = Math.ceil(total / pageSize);
                    var callback = opts.callback(data, total);
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
                alert("输入值不能小于1");
                return false;
            }
            var patrn = /^[0-9]{1,8}$/;
            if (!patrn.exec(val)) {
                alert("请输入正确的数字");
                return false;
            }
            if (val > pageCount) {
                alert("输入值不能大于总页数");
                return false;
            }
            return true;
        }
        function checkParam() {
            if (currPage < 1) {
                alert("配置参数错误\n错误代码:当前页码小于1");
                return false;
            }
            if (pageSize < 2) {
                alert("配置参数错误\n错误代码:-3");
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