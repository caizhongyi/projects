/*!
 * myPagination Jquery Pagination Plug-in Library v4.0
 * 
 * http://linapex.blog.163.com/blog/static/1892375162011523101954885/ 
 *
 * Date: 2011/7/18 19:47
 *
 *修改者：jgglg
 *email:jgglg@163.com
 *修改原因：基于玩儿道网站的开发具体定制
 */
(function ($) {
    $.fn.myPagination = function (opts) {
        initpage(opts, $(this));
        return $(this);
    };

    function initpage(opts, obj) {

        if (opts && opts instanceof Object) {
            var options;
            var currPage; //当前页
            var pageCount; //总页数
            var pageSize; //页码数
            var tempPage;
            var defaults = new Object({
                currPage: 1,
                pageSize: 10,
                cssStyle: 'badoo',
                toolbar: null,

                ajax: {
                    on: true,
                    loadmsg: '数据加载中...',
                    errormsg: '访问服务器超时，请重新刷新加载，谢谢！',
                    param: {
                        pagecurrent: 1,
                        pageSize: '',
                        opertype: ''
                    },
                    ajaxStart: function () {
                        return false;
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
                    showpageno: true,
                    tipmsg: '第{tip}页',
                    msg_on: true,
                    link: '#',
                    msg: '<span>&nbsp;&nbsp;跳{currText}/{sumPage}页</span>',
                    text: {
                        width: '22px'
                    }
                }
            });
           
            function getCurrPage() {
                if (options.info && options.info.cookie_currPageKey && options.info.cookie_currPage) {
                    var cookie_currPage = $.cookie(options.info.cookie_currPageKey + "_currPage");
                    if (cookie_currPage != "" && cookie_currPage != null) {
                        return cookie_currPage;
                    }
                }
                if (options.currPage) {
                    return options.currPage;
                } else {
                    return defaults.currPage;
                }
            }
            function getPageSize() {
                if (options.pageSize) {
                    return options.pageSize;
                } else {
                    return defaults.pageSize;
                }
            }
            function getTipMsg(pagenum) {
                return options.info.tipmsg.replace("{tip}", pagenum);
            }
            function getCssStyle() {
                if (options.cssStyle) {
                    return options.cssStyle;
                } else {
                    return defaults.cssStyle;
                }
            }
            function getAjax() {
                if (options.ajax && options.ajax.on) {
                    return options.ajax;
                } else {
                    return defaults.ajax;
                }
            }
            function getParam() {
                if (options.ajax.param) {
                    options.ajax.param.pagecurrent = currPage;
                    return options.ajax.param;
                } else {
                    defaults.ajax.param.pagecurrent = currPage;
                    return defaults.ajax.param;
                }
            }
            function getFirst() {
                if (options.info && options.info.first_on == false) {
                    return "";
                }
                if (options.info && options.info.first_on && options.info.first) {
                    var str = "";
                    if (pageCount == 0) {
                        str = "<a href='" + getLink() + "' title='" + getTipMsg(pageCount) + "'>" + options.info.first + "</a>";
                    }
                    else
                        str = "<a href='" + getLink() + "' title='" + getTipMsg(1) + "'>" + options.info.first + "</a>";
                    return str;
                } else {
                    var str = "";
                    if (pageCount == 0) {
                        str = "<a href='" + getLink() + "' title='" + getTipMsg(pageCount) + "'>" + defaults.info.first + "</a>";
                    }
                    else
                        str = "<a href='" + getLink() + "' title='" + getTipMsg(1) + "'>" + defaults.info.first + "</a>";
                    return str;
                }
            }
            function getLast(pageCount) {
                if (options.info && options.info.last_on == false) {
                    return "";
                }
                if (options.info && options.info.last_on && options.info.last) {
                    var str = "<a href='" + getLink() + "' title='" + getTipMsg(pageCount) + "'>" + options.info.last + "</a>";
                    return str;
                } else {
                    var str = "<a href='" + getLink() + "' title='" + getTipMsg(pageCount) + "'>" + defaults.info.last + "</a>";
                    return str;
                }
            }
            function getPrev() {
                if (options.info && options.info.prev_on == false) {
                    return "";
                }
                if (options.info && options.info.prev) {
                    return options.info.prev;
                } else {
                    return defaults.info.prev;
                }
            }
            function getNext() {
                if (options.info && options.info.next_on == false) {
                    return "";
                }
                if (options.info && options.info.next) {
                    return options.info.next;
                } else {
                    return defaults.info.next;
                }
            }
            function getLink() {
                if (options.info && options.info.link) {
                    return options.info.link;
                } else {
                    return defaults.info.link;
                }
            }
            function getMsg() {
                var tmp = 0;
                if (pageCount != 0) {
                    tmp = currPage;
                }
                var input = "<input type='text' value='" + tmp + "' >";
                if (options.info && options.info.msg_on == false) {
                    return false;
                }
                if (options.info && options.info.msg) {
                    var str = options.info.msg;
                    str = str.replace("{currText}", input);
                    str = str.replace("{currPage}", currPage);
                    str = str.replace("{sumPage}", pageCount);
                    return str;
                } else {
                    var str = defaults.info.msg;
                    str = str.replace("{currText}", input);
                    str = str.replace("{currPage}", currPage);
                    str = str.replace("{sumPage}", pageCount);
                    return str;
                }
            }
            function getText() {
                var msg = getMsg();
                if (msg) {
                    msg = $(msg);
                } else {
                    return "";
                }
                var input = msg.children(":text");
                if (options.info && options.info.text) {
                    var css = options.info.text;
                    for (temp in css) {
                        var val = eval("css." + temp);
                        input.css(temp, val);
                    }
                    return msg.html();
                } else {
                    var css = defaults.info.text;
                    for (temp in css) {
                        var val = eval("css." + temp);
                        input.css(temp, val);
                    }
                    return msg.html();
                }
            }
            function getAjaxStart() {
                if (options.ajax && options.ajax.ajaxStart) {
                    options.ajax.ajaxStart();
                } else {
                    defaults.ajax.ajaxStart;
                }
            }
            function getInt(val) {
                return parseInt(val);
            }
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
            function getLoadMsg() {
                if (options.ajax.loadmsg) {
                    return options.ajax.loadmsg;
                }
                else {
                    return defaults.ajax.loadmsg;
                }
            }
            function getErrorMsg() {
                if (options.ajax.errormsg) {
                    return options.ajax.errormsg;
                }
                else {
                    return defaults.ajax.errormsg;
                }
            }
            function updateView() {
                var content = "";
                obj.html("");
                if (options.toolbar) {
                    for (var i = 0; i < options.toolbar.length; i++) {
                        var p = options.toolbar[i];
                        if (p) {
                            switch (p.type) {
                                case 'checkbox':
                                    var ck = $('<input type="checkbox"/>').appendTo(obj);
                                    var cka = $('<span/>').appendTo(obj).html(p.text); //.addClass(p.cls)
                                    ck[0].onclick = eval(p.handler || function () { });
                                    cka[0].onclick = eval(p.handler || function () { });
                                    obj.append(content).append("&nbsp;&nbsp;");
                                    break;
                                case 'button':
                                    var ck1 = $('<span/>').appendTo(obj).html(p.text); //.addClass(p.cls)
                                    obj.append(content).append("&nbsp;&nbsp;");
                                    ck1[0].onclick = eval(p.handler || function () { });
                                    break;
                            }
                        }
                    }
                }

                content += getFirst();
                if (pageCount != 0) {
                    currPage = getInt(currPage);
                    pageCount = getInt(pageCount);
                    var link = getLink();
                    var firstPage = lastPage = 1;
                    if (currPage - tempPage > 0) {
                        firstPage = currPage - tempPage;
                    } else {
                        firstPage = 1;
                    }
                    if (firstPage + pageSize > pageCount) {
                        lastPage = pageCount + 1;
                        firstPage = lastPage - pageSize;
                    } else {
                        lastPage = firstPage + pageSize;
                    }
                    if (currPage == 1) {
                        content += "<span class=\"disabled\" title=\"" + getTipMsg(currPage) + "\">" + getPrev() + " </span>"
                    } else {
                        content += "<a href='" + link + "' title='" + getTipMsg(currPage - 1) + "'>" + getPrev() + " </a>"
                    }
                    if (firstPage <= 0) {
                        firstPage = 1;
                    }
                    if (options.info.showpageno == true) {
                        for (firstPage; firstPage < lastPage; firstPage++) {
                            if (firstPage == currPage) {
                                content += "<span class=\"current\" title=\"" + getTipMsg(firstPage) + "\">" + firstPage + "</span>"
                            } else {
                                content += "<a href='" + link + "' title='" + getTipMsg(firstPage) + "'>" + firstPage + "</a>"
                            }
                        }
                    }
                    if (currPage == pageCount) {
                        content += "<span class=\"disabled\" title=\"" + getTipMsg(currPage) + "\">" + getNext() + " </span>"
                    } else {
                        content += "<a href='" + link + "' title='" + getTipMsg(currPage + 1) + "'>" + getNext() + " </a>"
                    }
                }
                content += getLast(pageCount);
                content += getText();
                obj.append(content);
                obj.children(":text").keypress(function (event) {
                    var keycode = event.which;
                    if (keycode == 13) {
                        var page = $(this).val();
                        if (isCode(page)) {
                            obj.children("a").unbind("click");
                            obj.children("a").each(function () {
                                $(this).click(function () {
                                    return false;
                                })
                            });
                            createView(page);
                        }
                    }
                });
                obj.children("a").each(function (i) {
                    var page = this.title;
                    $(this).click(function () {
                        obj.children("a").unbind("click");
                        obj.children("a").each(function () {
                            $(this).click(function () {
                                return false;
                            })
                        });
                        var re = /\d+/;
                        var p = page.match(re)[0];
                        createView(p);
                        $(this).focus();
                        return false
                    })
                })
            };

            function createView(page) {
                currPage = page;
                var ajax = getAjax();
                if (ajax.on) {
                    getAjaxStart();
                    var param = getParam();
                    $.ajax({
                        url: 'pagination_common.axd',
                        type: 'POST',
                        dataType: "json",
                        data: param,
                        //contentType: "application/x-www-form-urlencoded;utf-8",
                        //async: true,
                        cache: false,
                        timeout: 60000,
                        beforeSend: function () {
                            obj.html(getLoadMsg());
                        },
                        error: function () {
                            obj.html(getErrorMsg());
                        },
                        success: function (data) {
                            var callback = options.callback(data);
                            eval(callback || function () { });
                            //debugger;
                            pageCount = Math.ceil(data.total / options.ajax.param.pageSize);
                            updateView();
                        }
                    })
                } else {
                    updateView();
                }
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

            options = $.extend({}, defaults, opts);
            currPage = getCurrPage();
            pageSize = getPageSize();
            tempPage = getInt(pageSize / 2);
            var cssStyle = getCssStyle();
            obj.addClass(cssStyle);
            if (checkParam()) {
                createView(currPage);
                //updateView();                
            }
        }
    }
})(jQuery);