/*
 *	回复插件
 *  作者：jgglg
 *  邮箱：jgglg@163.com
*   Date: 2012/10/6 01:33
* 依赖：
            <script type="text/javascript" src="/scripts/jquery.core.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.tabs.js"></script>
    <script type="text/javascript" src="/scripts/jquery.center.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.overlay.js"></script>
    <script type="text/javascript" src="/scripts/jquery.ui.dialog.js"></script>
    <script type="text/javascript" src="/scripts/plugin/TipPop/wanerdao2.pop.js"></script>
* 用法描述： 
* 1.此插件应用于绑定元素外层
*   例如有层<div class="a"></div>或<div id="a"></div>绑定了此回复插件
*   后最终页面代码片段呈现如下：
*   <div class="a"></div><div class="replay-content" id="reply_posts_id">....</div>
*   <div id="a"></div><div class="replay-content" id="reply_posts_id">....</div>
* 2.获取回复列表传递后台格式如下：
*   var pars = "{opertype:'" + opts.getreply.getreplyop + "',postid:'" + opts.posts_id + "',pageSize:" + max + ",pagecurrent:" + min + ",followid:}";
*   postid:此条记录ID，pageSize与pagecurrent用来取多少条默认是：pagecurrent=1,pageSize=3这就从第1条数据到第3条数据集合，followid:如果是获取第一级就是-1，否则第二级以下是回复ID
*   获取回复列表返回格式:
*  成功： {result:true,total:10,rows:[{isdelete:true|false是否自己可以删除,user_id:用户ID，user_name:用户名称,image_path:用户头像,replaycontent:回复内容,
replaytime:回复时间,id:回复内容ID}]}
*失败：{result:false,msg:xx}
*3.删除传递后台格式
*var para = "{opertype:'" + opts.deletereply.delreplyop + "',postid:'" + data.rows[i].id + "'}";用2所述
*成功：{result:true,msg:xx}
*失败：{result:false,msg:xx}
*4.添加传递后台格式
*var pars = "{opertype:'" + opts.addreply.addreplyop + "',postid:'" + opts.posts_id + "',replayid:'" + replayid + "',content:'" + content + "'}";
*   postid:此条记录ID，replayid:被回复人ID
*content：回复内容
*成功：{result:true,msg:xx}
*失败：{result:false,msg:xx}
 */
(function ($) {
    $.fn.replycontent = function (options) {
        var $this = $(this);
        var _defaults = {
            disabled: false, //是否禁用回复功能，如果为true，addreplylistbyaxd此属性不可用并且不显示回复留言框
            second_disabled: false, //是否禁用二级回复功能，如果为true，addreplylistbyaxd此属性不可用并且不显示回复留言框，胥鑫添加
            posts_id: '', //通过posts_id获取回复列表或添加回复信息，此属性不允许为空
            getreply:
            {
                getreplylistbyaxd: '', //通过posts_id和axd处理获取回复列表，此属性不允许为空    
                getreplyop: ''//通过posts_id和axd处理获取回复列表，此属性不允许为空    
            },
            deletereply:
            {
                delreplylistbyaxd: '', //通过posts_id和axd处理获取回复列表，此属性不允许为空
                delreplyop: ''//通过posts_id和axd处理获取回复列表，此属性不允许为空    
            },
            addreply:
            {
                addreplylistbyaxd: '', //通过posts_id和axd处理添加回复信息，此属性不允许为空
                addreplyop: ''//通过posts_id和axd处理获取回复列表，此属性不允许为空    
            },
            bindposition: 'after', //有4种类型，after,before,append,appendto
            loadrecordlimit: 10, //加载条数限制
            isrefresh: true, //默认每次点击都刷新回复列表，false不刷新回复列表
            replyconfig: {
                ishidden: true, //是否截断显示数据以防止数据过多时候占据页面太多
                limitlength: 70//限制显示回复信息字符串长度，此属性在ishidden为true时可用，否则不可用。
            }
        };
        $this.opts = $.extend({}, _defaults, options);
        return this.each(function () {
            if ($('#reply_' + $this.opts.posts_id)[0] === undefined) {
                switch ($this.opts.bindposition) {
                    case "after":
                        $this.after(_getUI($this.opts));
                        break;
                    case "before":
                        $this.before(_getUI($this.opts));
                        break;
                    case "append":
                        $this.append(_getUI($this.opts));
                        break;
                    case "appendto":
                        $this.appendTo(_getUI($this.opts));
                        break;
                }
                _loadData($this.opts, 1, $this.opts.loadrecordlimit, '-1');
                _replyEvent($this.opts);
            }
            else {
                $('#reply_' + $this.opts.posts_id).stop(true, true).animate({ height: 'show' });
                if ($this.opts.isrefresh) {
                    _loadData($this.opts, 1, $this.opts.loadrecordlimit, '-1');
                }
            }
        });
    };
    function _getUI(opts) {
        var _ui = '<div class="replay-content" id="reply_' + opts.posts_id + '">';
        _ui += '<img class="arrowhead" src="/images/home/ico_17x9.png"/>';
        if (opts.disabled) {
            _ui += '<div  class="replay-textarea" style="display: none;">';
        }
        else {
            _ui += '<div class="replay-textarea">';
        }
        _ui += '<textarea class="textarea" id="replay_' + opts.posts_id + '_text"></textarea>';
        _ui += '<input id="add' + opts.posts_id + '"  type="submit" class="button button2" value="' + wanerdaoLangTip("common_00084") + '"/>';
        _ui += '<input id="cancel' + opts.posts_id + '"  type="button" class="button button-gay" value="' + wanerdaoLangTip("common_00016") + '"/>';
        _ui += '</div>';
        _ui += '<ul id="reply_' + opts.posts_id + '_list">'; //回复列表数据展示
        _ui += '</ul>'; //回复列表数据展示
        _ui += '<div class="showall"><a href="javascript:;" class="icon icon-packup">' + wanerdaoLangTip("common_00077") + '</a>&nbsp;';
        _ui += '<a href="javascript:;" class="icon" style="display:none;">' + wanerdaoLangTip("common_00086") + '(<span>loading...</span>)</a>';
        _ui += '</div></div>';
        return _ui;
    };
    function _replyEvent(opts) {
        $(".replay-content .textarea").focus(function () {
            if (!$(this).attr('data-height')) {
                $(this).attr('data-height', $(this).height())
            }
            $(this).stop().animate({ height: 50 }, 1000);
        }).blur(function () {
            $(this).stop().animate({ height: $(this).attr('data-height') }, 1000);
        });
        $('#reply_' + opts.posts_id + ' .icon-packup').click(function () {
            $(this).closest('.replay-content').stop(true, true).animate({ height: 'hide' });
        });
        $('#add' + opts.posts_id).click(function () {
            var replaycontent = $('#replay_' + opts.posts_id + '_text').val();
            if (replaycontent.length > 200) {
                new pop({ titleid: 'common_00022', typename: 'error', msginfo: wanerdaoLangTip("common_00085") });
                return false;
            }
            else {
                _addReplay(opts, '-1', replaycontent);
            }
        });
        $('#cancel' + opts.posts_id).click(function () {
            $('#replay_' + opts.posts_id + '_text').val('');
        });
    };
    function _loadData(opts, min, max, followid) {
        var pars = "{opertype:'" + opts.getreply.getreplyop + "',postid:'" + opts.posts_id + "',pageSize:" + max + ",pagecurrent:" + min + ",followid:'" + followid + "'}";
        ajaxfuncbyloading(opts.getreply.getreplylistbyaxd, pars, '#reply_' + opts.posts_id + '_list', function (data) {
        }, function (data) {
            if (data.result) {
                if (parseInt(data.total) > 0) {
                    $('#reply_' + opts.posts_id + '_list').empty();
                    if (parseInt(data.total) > 10) {
                        $('#reply_' + opts.posts_id + ' .showall a:eq(1)').show().find("span").html(data.total);
                        $('#reply_' + opts.posts_id + ' .showall').find('a:eq(1)').click(function () {
                            _loadData(opts, 1, $('#reply_' + opts.posts_id + ' .showall span').text(), '-1');
                        });
                    }
                    var imgpath = "/images/default/48-48.jpg";
                    $.each(data.rows, function (i, n) {
                        var li_photo = $('<li class="clearfix"></li>').appendTo($('#reply_' + opts.posts_id + '_list'));
                        if (data.rows[i].image_path.length > 0) {
                            imgpath = data.rows[i].image_path;
                        }
                        var msg = '<img  class="photo" alt="" src="' + imgpath + '"/>';
                        msg += ' <div class="overflow">';
                        msg += $wd.format('<div class="mbUsername"><a href="/personal/personal_info.html?uid={0}">{1}</a>', data.rows[i].user_id, data.rows[i].user_name);
                        msg += '</div>';
                        if (opts.replyconfig.ishidden) {
                            msg += $wd.format("<p>{0}</p>", subPoints(data.rows[i].replaycontent, opts.replyconfig.limitlength));
                        }
                        else {
                            msg += $wd.format("<p>{0}</p>", data.rows[i].replaycontent);
                        }
                        msg += $wd.format('<div class="time">{0}</div>', dateStr(data.rows[i].replaytime));
                        msg += '<div class="replay">';
                        if (data.rows[i].isdelete) {
                            msg += '<a  href="javascript:;">' + wanerdaoLangTip("common_00047") + '</a>'; //删除
                        }
                        if (!opts.second_disabled) {
                            msg += '<a  href="javascript:;" class="replay-btn">' + wanerdaoLangTip("common_00084") + '</a>'; //回复
                        }
                        msg += '</div>';
                        msg += '<div class="clear"></div>';
                        msg += '<div class="replay-textarea"  style="display: none;">';
                        msg += '<textarea class="textarea"></textarea>';
                        msg += '<input  type="submit" class="button button2" value="' + wanerdaoLangTip("common_00084") + '"/>';
                        msg += '<input  type="button" class="button button-gay" value="' + wanerdaoLangTip("common_00016") + '"/>';
                        msg += '</div>';
                        msg += ' </div>';
                        li_photo.append(msg);
                        li_photo.find('.replay').find('a').click(function () {
                            if ($(this).text() === wanerdaoLangTip("common_00047")) {//删除
                                var para = "{opertype:'" + opts.deletereply.delreplyop + "',postid:'" + data.rows[i].id + "'}";
                                ajaxfunc(opts.deletereply.delreplylistbyaxd, para, function (data) {
                                    new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.msg });
                                }, function (data) {
                                    if (data.result) {
                                        new pop({ titleid: 'common_00025', typename: 'success', msginfo: data.msg, callback: function () {
                                            _loadData(opts, 1, opts.loadrecordlimit, followid);
                                        }
                                        });
                                        return false;
                                    }
                                    else {
                                        new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.msg });
                                        return false;
                                    }
                                });
                            }
                            else {//回复
                                var subreplay = $(this).parent().parent().find(".replay-textarea");
                                subreplay.fadeIn();
                                _loadSecondData(li_photo, opts, 1, opts.loadrecordlimit, data.rows[i].id);
                                subreplay.find(":submit").unbind("click").click(function () {
                                    var subreplaycontent = subreplay.find("textarea").val();
                                    if (subreplaycontent.length > 200) {
                                        new pop({ titleid: 'common_00022', typename: 'error', msginfo: wanerdaoLangTip("common_00085") });
                                        return false;
                                    }
                                    else {
                                        _addSecondReplay(li_photo, opts, data.rows[i].id, subreplaycontent);
                                    }
                                });
                                subreplay.find(":button").unbind("click").click(function () {
                                    subreplay.fadeOut();
                                });
                            }
                        });
                    });
                    $('#reply_' + opts.posts_id + '_list').find(".textarea").focus(function () {
                        if (!$(this).attr('data-height')) {
                            $(this).attr('data-height', $(this).height())
                        }
                        $(this).stop().animate({ height: 50 }, 1000);
                    }).blur(function () {
                        $(this).stop().animate({ height: $(this).attr('data-height') }, 1000);
                    });
                }
                else {
                    $('#reply_' + opts.posts_id + '_list').html('<li class="clearfix">' + wanerdaoLangTip("common_00005") + '</li>');
                }
            }
            else {
                var msgli = '<li class="clearfix">' + data.msg + '</li>';
                //$('#reply_' + opts.posts_id + ' .showall span').html(0);
                $('#reply_' + opts.posts_id + '_list').html(msgli);
            }
        });
    };
    function _addReplay(opts, replayid, content) {
        var pars = "{opertype:'" + opts.addreply.addreplyop + "',postid:'" + opts.posts_id + "',replayid:'" + replayid + "',content:'" + content + "'}";
        ajaxfunc(opts.addreply.addreplylistbyaxd, pars, function (data) {
            new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.msg });
        }, function (data) {
            if (data.result) {
                new pop({ titleid: 'common_00025', typename: 'success', msginfo: data.msg, callback: function () {
                    _loadData(opts, 1, opts.loadrecordlimit, replayid);
                }
                });
                return false;
            }
            else {
                new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.msg });
                return false;
            }
        });
    };
    function _addSecondReplay(liobj, opts, replayid, content) {
        var pars = "{opertype:'" + opts.addreply.addreplyop + "',postid:'" + opts.posts_id + "',replayid:'" + replayid + "',content:'" + content + "'}";
        ajaxfunc(opts.addreply.addreplylistbyaxd, pars, function (data) {
            new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.msg });
        }, function (data) {
            if (data.result) {
                new pop({ titleid: 'common_00025', typename: 'success', msginfo: data.msg, callback: function () {
                    _loadSecondData(liobj, opts, 1, opts.loadrecordlimit, replayid);
                }
                });
                return false;
            }
            else {
                new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.msg });
                return false;
            }
        });
    };
    function _loadSecondData(liobj, opts, min, max, followid) {
        var pars = "{opertype:'" + opts.getreply.getreplyop + "',postid:'" + opts.posts_id + "',pageSize:" + max + ",pagecurrent:" + min + ",followid:'" + followid + "'}";
        ajaxfuncbyloading(opts.getreply.getreplylistbyaxd, pars, liobj, function (data) {
        }, function (data) {
            if (data.result) {
                liobj.find("ul").remove();
                var ul_photo = $('<ul class="subreplay"></ul>').appendTo(liobj);
                if (parseInt(data.total) > 0) {
                    var imgpath = "/images/default/48-48.jpg";
                    $.each(data.rows, function (i, n) {
                        var li_photo = $('<li class="clearfix"></li>').appendTo(ul_photo);
                        if (data.rows[i].image_path.length > 0) {
                            imgpath = data.rows[i].image_path;
                        }
                        var msg = '<img  class="photo" alt="" src="' + imgpath + '"/>';
                        msg += ' <div class="overflow">';
                        msg += $wd.format('<div class="mbUsername"><a href="/personal/personal_info.html?uid={0}">{1}</a>', data.rows[i].user_id, data.rows[i].user_name);
                        msg += '</div>';
                        if (opts.replyconfig.ishidden) {
                            msg += $wd.format("<p>{0}</p>", subPoints(data.rows[i].replaycontent, opts.replyconfig.limitlength));
                        }
                        else {
                            msg += $wd.format("<p>{0}</p>", data.rows[i].replaycontent);
                        }
                        msg += $wd.format('<div class="time">{0}</div>', dateStr(data.rows[i].replaytime));
                        msg += '<div class="replay">';
                        if (data.rows[i].isdelete) {
                            msg += '<a  href="javascript:;">' + wanerdaoLangTip("common_00047") + '</a>'; //删除
                        }
                        msg += '<a  href="javascript:;" class="replay-btn">' + wanerdaoLangTip("common_00084") + '</a>'; //回复
                        msg += '</div>';
                        msg += '<div class="clear"></div>';
                        msg += '<div class="replay-textarea"  style="display: none;">';
                        msg += '<textarea class="textarea"></textarea>';
                        msg += '<input  type="submit" class="button button2" value="' + wanerdaoLangTip("common_00084") + '"/>';
                        msg += '<input  type="button" class="button button-gay" value="' + wanerdaoLangTip("common_00016") + '"/>';
                        msg += '</div>';
                        msg += ' </div>';
                        li_photo.append(msg);
                        li_photo.find('.replay').find('a').click(function () {
                            if ($(this).text() === wanerdaoLangTip("common_00047")) {//删除
                                var para = "{opertype:'" + opts.deletereply.delreplyop + "',postid:'" + data.rows[i].id + "'}";
                                ajaxfunc(opts.deletereply.delreplylistbyaxd, para, function (data) {
                                    new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.msg });
                                }, function (data) {
                                    if (data.result) {
                                        new pop({ titleid: 'common_00025', typename: 'success', msginfo: data.msg, callback: function () {
                                            _loadSecondData(liobj, opts, 1, opts.loadrecordlimit, followid);
                                        }
                                        });
                                        return false;
                                    }
                                    else {
                                        new pop({ titleid: 'common_00022', typename: 'error', msginfo: data.msg });
                                        return false;
                                    }
                                });
                            }
                            else {//回复
                                var subreplay = $(this).parent().parent().find(".replay-textarea");
                                subreplay.fadeIn();
                                _loadSecondData(li_photo, opts, 1, opts.loadrecordlimit, data.rows[i].id);
                                subreplay.find(":submit").unbind("click").click(function () {
                                    var subreplaycontent = subreplay.find("textarea").val();
                                    if (subreplaycontent.length > 200) {
                                        new pop({ titleid: 'common_00022', typename: 'error', msginfo: wanerdaoLangTip("common_00085") });
                                        return false;
                                    }
                                    else {
                                        _addSecondReplay(li_photo, opts, data.rows[i].id, subreplaycontent);
                                    }
                                });
                                subreplay.find(":button").unbind("click").click(function () {
                                    subreplay.fadeOut();
                                });
                            }
                        });
                    });
                    ul_photo.append('<div class="showall"><a href="javascript:;" class="icon icon-packup">' + wanerdaoLangTip("common_00077") + '</a>&nbsp;');
                    if (parseInt(data.total) > 10) {
                        ul_photo.append('<a href="javascript:;" class="icon">' + wanerdaoLangTip("common_00086") + '(<span>' + data.total + '</span>)</a>');
                        var tmore = ul_photo.find('.showall a:eq(1)');
                        tmore.click(function () {
                            //ul_photo.stop(true, true).animate({ height: 'hide' });
                            _loadSecondData(liobj, opts, 1, tmore.find("span").text(), followid);
                        });
                    }
                    ul_photo.append('</div>');
                    ul_photo.find('.showall a:eq(0)').click(function () {
                        liobj.stop(true, true).animate({ height: 'hide' });
                    });
                }
                else {
                    ul_photo.html('<li class="clearfix">' + wanerdaoLangTip("common_00005") + '</li>');
                }
                liobj.find(".textarea").focus(function () {
                    if (!$(this).attr('data-height')) {
                        $(this).attr('data-height', $(this).height())
                    }
                    $(this).stop().animate({ height: 50 }, 1000);
                }).blur(function () {
                    $(this).stop().animate({ height: $(this).attr('data-height') }, 1000);
                });
            }
        });
    };
})(jQuery)